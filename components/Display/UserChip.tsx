import { UserData } from '@/app/page';
import { Chip, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect } from 'react';

const UserChip = ({ user }: { user: UserData }) => {
  const [userData, setUserData] = useState<UserData>({
    username: null,
    email: null,
  });

  useEffect(() => {
    if (user && setUserData) {
      setUserData(user);
    }
  }, [user]);

  const { username, email } = userData;
  return (
    username &&
    email && (
      <Chip
        avatar={<PersonIcon sx={{ fontSize: '32px' }} />}
        label={
          <Stack direction="column">
            <Typography variant="h6">{username}</Typography>
            <Typography variant="subtitle1">{email}</Typography>
          </Stack>
        }
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
          '& .MuiChip-avatar': {
            width: '48px',
            height: '48px',
          },
        }}
      />
    )
  );
};

export default UserChip;
