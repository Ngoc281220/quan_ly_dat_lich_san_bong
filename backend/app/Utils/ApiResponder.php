<?php

namespace App\Utils;

use League\Fractal\TransformerAbstract;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ApiResponder
{
    private TransformerAbstract $transformerAbstract;
    private $data;

    public function __construct($data, TransformerAbstract $transformerAbstract)
    {
        $this->transformerAbstract = $transformerAbstract;
        $this->data = $data;
    }

    private function success(int $statusCode = 200, string $message = "Yêu cầu thành công!")
    {
        if (!empty($this->data)) {
            $data = $this->data instanceof LengthAwarePaginator || $this->data instanceof Collection ? fractal()
                ->collection($this->data)
                ->transformWith($this->transformerAbstract)
                ->toArray() : fractal()->item($this->data)->transformWith($this->transformerAbstract)->toArray();
        }
        return [
            'status'  => $statusCode,
            'message' => $message,
            'data' => $data['data'] ?? null
        ];
    }

    public function created(): JsonResponse
    {
        return response()->json($this->success(201, "Created"));
    }

    public function updated(): JsonResponse
    {
        return  response()->json($this->success(200, "Updated"));
    }

    public function deleted(): JsonResponse
    {
        return  response()->json($this->success(200, "Xóa thành công"));
    }

    public function data(): JsonResponse
    {
        return  response()->json($this->success(200, "Lấy dữ liệu thành công"));;
    }

    public function error(int $statusCode = 400, string $message = "Có lỗi xảy ra!"): JsonResponse
    {
        return response()->json([
            'status'  => $statusCode,
            'message' => $message,
            'data'    => null,
        ]);
    }

    public function collection(): JsonResponse
    {
       return  response()->json($this->success(200, "Lấy dữ liệu thành công"));;
    }

    public function pagination(): JsonResponse
    {
        if (!$this->data instanceof LengthAwarePaginator) {
            return $this->error(400, "Dữ liệu không hỗ trợ phân trang!");
        }

        $res = $this->success();
        $data['data'] = $res['data'];

        $data['pagination'] = [
            'total'        => $this->data->total(),
            'perPage'      => $this->data->perPage(),
            'currentPage'  => $this->data->currentPage(),
            'lastPage'     => $this->data->lastPage(),
        ];

        $data['status'] = $res['status'];
        $data['message'] = $res['message'];

        return response()->json($data);
    }
}
