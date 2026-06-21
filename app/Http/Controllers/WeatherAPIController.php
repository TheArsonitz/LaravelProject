<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class WeatherAPIController extends Controller
{
    public function weatherReport()
    {
        $api_key = env('WEATHERAPI_KEY');
        $response = Http::get('https://api.weatherapi.com/v1/forecast.json', [
            'key' => $api_key,
            'q' => 'auto:ip',
            'days' => '3',
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return [];

    }
}
