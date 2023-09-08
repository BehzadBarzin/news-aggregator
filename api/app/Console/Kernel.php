<?php

namespace App\Console;

use App\Jobs\AggregateGuardian;
use App\Jobs\AggregateNewsAPI;
use App\Jobs\AggregateNYTimes;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Schedule jobs using cron-jobs, hourly, to aggregate all the new data from all sources
        // $schedule->job(new AggregateNewsAPI)->everyTwoMinutes();
        // $schedule->job(new AggregateGuardian)->everyTwoMinutes();
        // $schedule->job(new AggregateNYTimes)->everyTwoMinutes();

        // Todo: The above code is commented because the default queue connection = database doesn't work and jobs don't get posted to db
        // Todo: for the same reason, when running 'php artisan queue:work' we need to specify the queue connection → 'php artisan queue:work database'
        $schedule->call(function () {
            AggregateNewsAPI::dispatch()->onConnection('database'); // Manually setting queue connection
        })->everyTwoMinutes();
        $schedule->call(function () {
            AggregateGuardian::dispatch()->onConnection('database'); // Manually setting queue connection
        })->everyTwoMinutes();
        $schedule->call(function () {
            AggregateNYTimes::dispatch()->onConnection('database'); // Manually setting queue connection
        })->everyTwoMinutes();

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
