<?php

namespace App\momo;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentMomo
{
    protected $orderInfo;
    protected $amount;
    protected $orderId;
    protected $requestId;
    protected $requestType = 'payWithATM';
    protected $extraData = '';
    protected $lang = 'vi';

    public function __construct() {}

    public function setData($orderInfo, $amount, $orderId)
    {
        $this->orderInfo = $orderInfo;
        $this->amount = $amount;
        $this->orderId = $orderId;
        $this->requestId = time() . "";
    }

    public function execPostRequest($url, $data)
    {
        try {
            $response = Http::withoutVerifying()
                ->timeout(30)
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ])
                ->post($url, $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('MoMo API Failed', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return ['error' => 'MoMo API failed'];
        } catch (\Exception $e) {
            Log::error('MoMo Connection Error: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    public function paymentMomo()
    {
        try {
            $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            $partnerCode = 'MOMOBKUN20180529';
            $accessKey = 'klm05TvNBzhg7h7j';
            $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
            $redirectUrl = "http://localhost:3000/payment/success";
            $ipnUrl = "http://localhost:3000/payment/success";

            // Tính toán signature
            $rawHash = "accessKey=" . $accessKey
                . "&amount=" . $this->amount
                . "&extraData=" . $this->extraData
                . "&ipnUrl=" . $ipnUrl
                . "&orderId=" . $this->orderId
                . "&orderInfo=" . $this->orderInfo
                . "&partnerCode=" . $partnerCode
                . "&redirectUrl=" . $redirectUrl
                . "&requestId=" . $this->requestId
                . "&requestType=" . $this->requestType;

            $signature = hash_hmac("sha256", $rawHash, $secretKey);

            $data = [
                'partnerCode' => $partnerCode,
                'partnerName' => "Test",
                'storeId' => "MomoTestStore",
                'requestId' => $this->requestId,
                'amount' => $this->amount,
                'orderId' => $this->orderId,
                'orderInfo' => $this->orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => $this->lang,
                'extraData' => $this->extraData,
                'requestType' => $this->requestType,
                'signature' => $signature
            ];

            $result = $this->execPostRequest($endpoint, $data);
            if (isset($result['payUrl'])) {
                return $result;
            }

            return back()->withErrors(['momo_error' => 'Không thể kết nối đến MoMo']);
        } catch (Exception $e) {
            Log::error("[MoMo Payment Error] " . $e->getMessage());
            return back()->withErrors(['momo_error' => $e->getMessage()]);
        }
    }
}
