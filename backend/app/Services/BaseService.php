<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class BaseService
{
    protected function saveFile($files, string $nameFolder)
    {
        $storedFiles = [];
        // Nếu chỉ có một file, chuyển thành mảng để xử lý chung
        if ($files instanceof UploadedFile) {
            $files = [$files];
        }

        // Duyệt qua từng file
        foreach ($files as $file) {
            if ($file->isValid()) {
                // Đặt tên file duy nhất
                $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

                // Lưu file vào storage/public/{nameFolder}
                $filePath = $file->storeAs($nameFolder, $fileName, 'public');

                // Thêm vào danh sách file đã lưu
                $storedFiles[] = [
                    'name' => $fileName,
                    'path' => "storage/" . $filePath,
                ];
            }
        }
        return $storedFiles;
    }
}
