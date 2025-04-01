<?php

namespace App\momo;

use Exception;

class PaymentMomo
{
    private $orderInfo;
    private $amount;
    private $orderId;

    public function __construct($orderInfo, $amount, $orderId)
    {
        $this->orderInfo = $orderInfo;
        $this->amount = $amount;
        $this->orderId = $orderId;
    }

    private function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }

    public function paymentMomo()
    {
        try {
            $url = env('MOMO_END_POINT');
            $partnerCode = env('MOMO_PARTNER_CODE');
            $accessKey = env('MOMO_ACCESS_KEY');
            $secretKey = env('MOMO_SECRET_KEY');

            $requestId = time();
            $requestType = "payWithATM";
            $extraData = "";
            $ipnUrl = "";
            $redirectUrl = "";
            // Tạo chữ ký bảo mật
            $rawHash = "accessKey={$accessKey}&amount={$this->amount}&extraData={$extraData}&ipnUrl={$ipnUrl}&orderId={$this->orderId}&orderInfo={$this->orderInfo}&partnerCode={$partnerCode}&redirectUrl={$redirectUrl}&requestId={$requestId}&requestType={$requestType}";
            $signature = hash_hmac("sha256", $rawHash, $secretKey);

            $data = [
                'partnerCode' => $partnerCode,
                'partnerName' => "Test",
                'storeId' => "MomoTestStore",
                'requestId' => (string)$requestId,
                'amount' => (string)$this->amount,
                'orderId' => (string)$this->orderId,
                'orderInfo' => $this->orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => 'vi',
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature
            ];

            $result = $this->execPostRequest($url, json_encode($data));
            $jsonResult = json_decode($result, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception("JSON Decode Error: " . json_last_error_msg());
            }

            return $jsonResult;
        } catch (Exception $e) {
            // Ghi log lỗi
            error_log("[MoMo Payment Error] " . $e->getMessage());
            return ['error' => true, 'message' => $e->getMessage()];
        }
    }
}
