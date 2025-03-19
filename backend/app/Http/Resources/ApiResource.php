<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApiResource extends JsonResource
{
    private string $message;
    private int $statusCode;

    public function __construct($resource, string $message = '', int $statusCode)
    {
        parent::__construct($resource);
        $this->message = $message;
        $this->statusCode = $statusCode;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->resource,
            'message' => $this->message,
            'status' => $this->statusCode
        ];
    }
}
