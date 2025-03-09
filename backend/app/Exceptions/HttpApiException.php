<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class HttpApiException extends Exception
{
    protected int $statusCode;
    protected string $nameColumn;
    public function __construct(string $message, string $nameColumn, int $statusCode = 400)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->nameColumn = $nameColumn;
    }

    public function render(): JsonResponse
    {
        return response()->json([
            'message' => $this->getMessage(),
            'errors' => [
                $this->nameColumn => $this->getMessage(),
            ],
        ], $this->statusCode);
    }
}
