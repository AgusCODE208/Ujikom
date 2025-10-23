@echo off
echo Setting up Cinema Ticket System...
echo.

echo Running migrations and seeders...
php artisan migrate:fresh --seed

echo.
echo Setup completed!
echo.
echo Default users created:
echo - Admin: admin@bioskop.com / password
echo - Owner: owner@bioskop.com / password  
echo - Kasir: kasir@bioskop.com / password
echo - User: user@bioskop.com / password
echo.
echo Start server with: php artisan serve
pause