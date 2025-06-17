import { Container, Card, Grid, Box } from '@mui/material';
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

const masonryGrid = {
  display: 'grid',
  gap: '10px',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridAutoRows: 'masonry',
  '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
};

const masonryItem = {
  border: '2px solid #ffa94d',
  borderRadius: '5px',
  backgroundColor: '#ffd8a8',
  color: '#d9480f',
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
      <Box padding={4} sx={masonryGrid}>
        <Box sx={masonryItem}>
          <Card sx={cardStyle}>Section 1</Card>
        </Box>
        <Box sx={masonryItem}>
          <Card sx={cardStyle}>Section 2</Card>
        </Box>
        <Box sx={masonryItem}>
          <Card sx={cardStyle}>Section 3</Card>
        </Box>
        <Box sx={masonryItem}>
          <Card sx={cardStyle}>Section 4</Card>
        </Box>
      </Box>
    </Container>
  );
}
