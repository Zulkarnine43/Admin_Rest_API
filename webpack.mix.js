const mix = require('laravel-mix');


mix.react('resources/js/Main.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.copy('resources/css/style.css','public/css')
mix.copy('resources/css/responsive.css','public/css')
mix.copy('resources/css/sideNav.css','public/css')
mix.copyDirectory('resources/images','public/images')
