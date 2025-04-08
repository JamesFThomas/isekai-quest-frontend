import { Container, Card, Grid } from '@mui/material';
import NavBar from '../Layout/NavBar';

const cardStyle = {
  height: '20em',
  width: '100%',
  backgroundColor: '#ffcd0331',
};

const pageStyle = {
  backgroundColor: '#3b3b3b',
  minHeight: '100vh',
};

export default function QuestBoardView() {
  return (
    <Container sx={pageStyle} maxWidth={false} disableGutters>
      <NavBar />
      <Grid container spacing={6} padding={4}>
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>Section 1</Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>Section 2</Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>Section 3</Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={cardStyle}>Section 4</Card>
        </Grid>
      </Grid>
    </Container>
  );
}
