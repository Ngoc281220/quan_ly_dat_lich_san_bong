<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ApiResourceCollection extends ResourceCollection
{
    private string $message;
    private int $statusCode;
    public function __construct($resource, $message = "", $statusCode = 200)
    {
        parent::__construct($resource);
        $this->message = $message;
        $this->statusCode = $statusCode;
    }
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'pagination' => [
                'total' => $this->resource->total(),
                'per_page' => $this->resource->perPage(),
                'current_page' => $this->resource->currentPage(),
                'last_page' => $this->resource->lastPage(),
            ],
            'message' => $this->message,
            'status' => $this->statusCode
        ];
    }
}
