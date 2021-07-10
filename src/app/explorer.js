
import { useState } from 'react';
import {
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: 'relative',
    'margin-top': '25vh',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'end',
    'align-items': 'center'
  },
  formTitle: {
    'font-family': 'Nanum Brush Script',
    'font-weight': 'bold',
    'white-space': 'nowrap'
  },
  form: {
    'min-width': '400px',
    width: '60vw',
    display: 'flex',
    padding: theme.spacing(4),
    'padding-bottom': theme.spacing(2),
    'padding-top': theme.spacing(1),
    background: theme.palette.divider
  },
  grow: {
    'flex-grow': 1
  }
}));

export default function Explorer () {
  const [searchText, setSearchText] = useState();
  const [searchType, setSearchType] = useState();
  const [searchHint, setSearchHint] = useState('Type Search Query');
  const handleSearchText = (event) => setSearchText(event.target.value);
  const handleSearchType = (event) => {
    const { value } = event.target;
    switch (value) {
      case 'block': setSearchHint('Type Block Number'); break;
      case 'transaction': setSearchHint('Type Transaction ID'); break;
      case 'address': setSearchHint('Type WOTS+ Address'); break;
      case 'tag': setSearchHint('Type Tagged Address'); break;
      case 'network': setSearchHint('Type IPv4 Address'); break;
      default: setSearchHint('Type Search Query');
    }
    setSearchType(value);
  };
  const classes = useStyles();

  return (
    <Container>
      <form className={classes.formContainer}>
        <Typography className={classes.formTitle} variant='h1'>
          Mochimo Explorer
        </Typography>
        <Paper className={classes.form}>
          <FormControl className={classes.selectControl}>
            <InputLabel id='search-native-label'>Search for</InputLabel>
            <Select
              native
              dir='rtl'
              color='secondary'
              value={searchType}
              onChange={handleSearchType}
              labelId='search-native-label'
              inputProps={{ name: searchType && 'search' }}
            >
              <option aria-label='all' />
              <option value='block'>Block</option>
              <option value='transaction'>Transaction</option>
              <option value='address'>Address</option>
              <option value='tag'>Tag</option>
              <option value='network'>Node</option>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            className={classes.grow}
            color='secondary'
            onChange={handleSearchText}
            label={`${searchHint}...`}
            InputProps={{
              required: true,
              name: searchText && 'for',
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton type='submit' aria-label='search'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Paper>
      </form>
    </Container>
  );
}
