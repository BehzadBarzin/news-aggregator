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
        $schedule->job(new AggregateNewsAPI)->hourly();
        $schedule->job(new AggregateGuardian)->hourly();
        $schedule->job(new AggregateNYTimes)->hourly();
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
