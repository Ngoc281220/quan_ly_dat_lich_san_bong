import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { listPost } from "../../../services/website/post";

function BlogList() {
  const [posts, setPosts] = useState([]);

  const loadData = async () => {
    try {
        const { data } = await listPost();
        setPosts(data);
    } catch (error) {
        console.log('Lỗi không load được bài viết', error);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="mt-5 py-5">
      {posts.length > 0 ? (
        <Row>
          {posts.map((post) => (
            <Col md={12} key={post.id} className="mb-4">
              <Card className="shadow-sm">
                <Row noGutters>
                  <Col md={5}>
                    <Card.Img
                      variant="top"
                      src={post.image_url}
                      alt={post.title}
                    />
                  </Col>
                  <Col md={7}>
                    <Card.Body>
                      <small className="text-muted">
                        🗓 {post.date} | 💬 {post.comments} COMMENTS
                      </small>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.excerpt}</Card.Text>
                      <Button
                        variant="outline-primary"
                        href={`/post/${post.id}`}
                      >
                        Read more →
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">Không có bài viết nào.</p>
      )}
    </Container>
  );
}

export default BlogList;
