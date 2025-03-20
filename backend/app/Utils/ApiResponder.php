<?php

namespace App\Utils;

use League\Fractal\TransformerAbstract;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\JsonResponse;

class ApiResponder
{

    private TransformerAbstract $transformerAbstract;
    private Arrayable|array $data;
    public function __construct(Arrayable|array $data, TransformerAbstract $transformerAbstract)
    {
        $this->transformerAbstract = $transformerAbstract;
        $this->data = $data;
    }

    public function response(int $statusCode = 200, string $message = "Yêu cầu thành công!")
    {
        return response()->json([
            'status' => $statusCode,
            'message' => $message,
            'data' => fractal()
                ->item($this->data)
                ->transformWith($this->transformerAbstract)
                ->toArray()
        ], $statusCode);
    }

    public function created()
    {
        return $this->response(201, "Created");
    }

    public function updated()
    {
        return $this->response(200, "Updated");
    }

    public function deleted(): JsonResponse
    {
        return $this->response(200, "Xóa thành công!");
    }

    public function error(int $statusCode = 400, string $message = "Có lỗi xảy ra!"): JsonResponse
    {
        return response()->json([
            'status' => $statusCode,
            'message' => $message,
            'data' => null
        ], $statusCode);
    }

    public function collection()
    {
        return fractal()->collection($this->data)->transformWith($this->transformerAbstract)->toArray();
    }

    public function pagination()
    {
        if (!$this->data instanceof \Illuminate\Pagination\LengthAwarePaginator) {
            return $this->error("Dữ liệu không hỗ trợ phân trang!", 400);
        }

        return [
            'status' => 200,
            'message' => 'Lấy danh sách thành công!',
            'data' => $this->collection(),
            'pagination' => [
                'total' => $this->data->total(),
                'perPage' => $this->data->perPage(),
                'currentPage' => $this->data->currentPage(),
                'lastPage' => $this->data->lastPage(),
            ],
        ];
    }
}
