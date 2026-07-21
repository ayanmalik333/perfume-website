Get-ChildItem -Filter *.html | ForEach-Object {
    $content = Get-Content $_ -Raw
    $content = $content -replace '<header class="sticky top-0 bg-darkBg/80 backdrop-blur-md border-b border-accent/15 m-0"[^>]*>', '<header class="fixed w-full top-0 z-[100] transition-colors duration-300 bg-transparent border-b border-transparent m-0">'
    Set-Content $_ $content -Encoding UTF8
}
