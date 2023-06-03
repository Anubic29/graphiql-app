import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

type MemberProps = {
  name: string;
  link: string;
};

function Member(props: MemberProps) {
  return (
    <Box sx={{ paddingTop: '8px', paddingRight: '30px' }}>
      <Link to={props.link} style={{ display: 'inline-flex' }}>
        <GitHub />
        <Typography variant="body1" component="span" sx={{ paddingLeft: '15px' }}>
          {props.name}
        </Typography>
      </Link>
    </Box>
  );
}

export default Member;
