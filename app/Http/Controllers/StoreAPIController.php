<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class StoreAPIController extends Controller
{
    public function storeResearch()
    {
        $response = Http::get('https://fakestoreapi.com/products');

        if ($response->successful()) {
            return $response->json();
        }

        return [];

    }
}
