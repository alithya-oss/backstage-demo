import { ChangeEvent } from 'react';
import { InfoCard } from '@backstage/core-components';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import useLocalStorage from 'react-use/esm/useLocalStorage';

export function AdvancedSettings() {
  const [value, setValue] = useLocalStorage<'on' | 'off'>(
    'advanced-option',
    'off',
  );

  const toggleValue = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.currentTarget.checked ? 'on' : 'off');
  };

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={6}>
        <InfoCard title="Advanced settings" variant="gridItem">
          <List>
            <ListItem>
              <ListItemText
                primary="Advanced user option"
                secondary="An extra settings tab to further customize the experience"
              />
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  value={value}
                  onChange={toggleValue}
                  name="advanced"
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </InfoCard>
      </Grid>
    </Grid>
  );
}