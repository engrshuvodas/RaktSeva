@echo off
setlocal

rem Launch helper for the RaktSeva PHP project
rem If XAMPP is installed in the default location, this starts it first.

set "SITE_URL=http://localhost/RaktSeva/home.php"
set "XAMPP_START=C:\xampp\xampp_start.exe"
set "XAMPP_CONTROL=C:\xampp\xampp-control.exe"

if exist "%XAMPP_START%" (
    start "" "%XAMPP_START%"
) else if exist "%XAMPP_CONTROL%" (
    start "" "%XAMPP_CONTROL%"
) else (
    echo XAMPP was not found in C:\xampp.
    echo Start Apache and MySQL manually, then press any key to continue.
    pause >nul
)

timeout /t 5 /nobreak >nul
start "" "%SITE_URL%"

endlocal