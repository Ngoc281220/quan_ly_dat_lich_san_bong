import {useEffect} from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { saveInfoPaymentMo } from '../../../services/website/payment';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const handleSaveInfoPaymentMo = async () => {
        const params = {
            order_code: searchParams.get('orderId'),
            amount: searchParams.get('amount'),
        };
        try {
            await saveInfoPaymentMo(params);
        } catch (error) {
            console.log(error);
        }
    }   
    useEffect(() => {
        handleSaveInfoPaymentMo();
    }, [searchParams])
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="payment-card shadow-lg border-0 rounded-lg">
                        <Card.Body className="text-center">
                            <i className="fas fa-check-circle fa-6x text-success payment-icon"></i>
                            <h3 className="mt-4 payment-title">Thanh toán thành công!</h3>
                            <p className="text-muted payment-subtitle">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Đơn hàng của bạn đã được xử lý thành công.</p>
                            <Button className="mt-4 payment-btn" href="/" size="lg">Quay lại trang chủ</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
