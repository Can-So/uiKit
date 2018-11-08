export const styles = {
  container: base => ({
    ...base,
    display: 'flex',
    padding: 0,
  }),
  control: base => ({
    ...base,
    padding: 0,
    minHeight: 0,
    borderRadius: 5,
  }),
  valueContainer: base => ({
    ...base,
    flex: 'unset',
    flexDirection: 'column',
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    width: 24,
    height: 24,
    overflow: 'hidden',
  }),
  menu: base => ({
    ...base,
    width: 'auto',
    padding: '5px 0',
  }),
};
