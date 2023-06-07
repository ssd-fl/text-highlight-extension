import { Box, Tooltip } from '@mui/material';
import { TooltipProps } from './Tooltip.types';

const CustomTooltip = ({ title }: TooltipProps) => {
  return (
    <Tooltip open={true} title={title} arrow>
      <Box></Box>
    </Tooltip>
  );
};

CustomTooltip.displayName = 'CustomTooltip';

export { CustomTooltip };
