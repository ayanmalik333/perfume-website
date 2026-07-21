# Ensure the script stops on error
$ErrorActionPreference = "Stop"

$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Output "PowerShell Web Server running at http://localhost:$port/"
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Decode and clean path
        $rawUrl = $request.RawUrl.Split('?')[0]
        $urlPath = [System.Uri]::UnescapeDataString($rawUrl)
        if ($urlPath -eq "/") { $urlPath = "/index.html" }
        
        $cleanPath = $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar).TrimStart([System.IO.Path]::DirectorySeparatorChar)
        $localPath = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $cleanPath))
        
        # Security: Prevent directory traversal
        $cwd = (Get-Location).Path
        if (-not $localPath.StartsWith($cwd)) {
            $response.StatusCode = 403
            $response.ContentType = "text/plain"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            $response.OutputStream.Close()
            continue
        }
        
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            
            $mime = switch ($ext) {
                ".html" { "text/html" }
                ".css" { "text/css" }
                ".js" { "text/javascript" }
                ".jpg" { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".png" { "image/png" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        
        $response.OutputStream.Close()
    }
} catch {
    Write-Error $_
} finally {
    if ($null -ne $listener -and $listener.IsListening) {
        $listener.Stop()
    }
}
