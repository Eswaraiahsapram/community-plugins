import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { HealthStatus } from '../../types';

const useStyles = makeStyles(() =>
  createStyles({
    filterContainer: {
      width: '14rem',
    },
    filterButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 12px',
      border: `1px solid #ced4da`,
      width: '100%',
      textTransform: 'none',
    },
    filterLabel: {
      marginLeft: '8px',
      marginRight: '8px',
      flexGrow: 1,
      textAlign: 'left',
    },
    menu: {
      marginTop: '4px',
    },
    menuPaper: {
      minWidth: '14rem',
    },
  }),
);

interface ResourcesFilterByProps {
  setFilterValue: (value: string) => void;
}

export const ResourcesFilterBy: React.FC<ResourcesFilterByProps> = ({
  setFilterValue,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?: string) => {
    if (option) {
      setSelectedOption(option);
      setFilterValue(option);
    }
    setAnchorEl(null);
  };

  return (
    <div className={classes.filterContainer}>
      <Button
        className={classes.filterButton}
        onClick={handleClick}
        aria-controls="filter-menu"
        aria-haspopup="true"
      >
        <FilterAltIcon />
        <Typography variant="body1" className={classes.filterLabel}>
          {selectedOption || 'Filter by'}
        </Typography>
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        classes={{ paper: classes.menuPaper }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.menu}
      >
        <MenuItem
          key="all"
          selected={selectedOption === 'All'}
          onClick={() => handleClose('All')}
        >
          All
        </MenuItem>
        {Object.keys(HealthStatus).map(statusKey => (
          <MenuItem
            key={HealthStatus[statusKey as keyof typeof HealthStatus]}
            selected={
              selectedOption ===
              HealthStatus[statusKey as keyof typeof HealthStatus]
            }
            onClick={() =>
              handleClose(HealthStatus[statusKey as keyof typeof HealthStatus])
            }
          >
            {HealthStatus[statusKey as keyof typeof HealthStatus]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
