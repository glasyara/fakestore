import { useState, useEffect, useContext } from 'react';
import {
  Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  Typography, Avatar, Button, Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { token, logout } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => setProducts(response.data));
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>Produtos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID Produto</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    src={product.image}
                    alt={product.title}
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Products;
