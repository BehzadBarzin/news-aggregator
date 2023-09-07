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
        $schedule->job(new AggregateNewsAPI)->everyFiveMinutes();
        $schedule->job(new AggregateGuardian)->everyFiveMinutes();
        $schedule->job(new AggregateNYTimes)->everyFiveMinutes();
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
