import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { formatDateTime } from '../../common/helpers';
import { HistoryCardProps } from './HistoryCard.types';

const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <Box
      sx={{
        width: 345,
        height: 60,
        overflow: 'scroll',
        backgroundColor: '#404040',
        borderRadius: 1,
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 8px 8px -6px',
        borderColor: '#404040',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#4d4d4d',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      p={2}
      my={1.5}
    >
      <Grid container>
        <Grid item xs={8}>
          <Box>
            <Tooltip title={data.keyword} arrow>
              <Typography
                color="white"
                textAlign="left"
                sx={{
                  fontSize: 14,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                mr={1}
              >
                {data.keyword}
              </Typography>
            </Tooltip>
          </Box>
          <Box display={'flex'} mt={0.5}>
            {data.tags.map((tag: string, index: number) => (
              <Box
                key={`${tag}-${index}`}
                mr={1}
                p={0.5}
                sx={{
                  fontSize: 10,
                  borderRadius: 1,
                  border: '0.1px solid white',
                  color: 'white',
                }}
              >
                #{tag}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={4} display={'flex'} alignItems={'center'}>
          <Typography
            variant="subtitle2"
            color="white"
            textAlign={'right'}
            sx={{ fontSize: 12 }}
          >
            {formatDateTime(data.createdDate)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="white" align="left" sx={{ fontSize: 13 }} mt={1}>
            {data.text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

HistoryCard.displayName = 'HistoryCard';

export { HistoryCard };
