import { useState, useEffect } from 'react';

/** Custom hook for keeping state data synced with sessionStorage.
 *
 * This creates `item` as state and look in sessionStorage for current value
 * (if not found, defaults to `firstValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from sessionStorage
 * - else, updates sessionStorage
 *
 * To the component, this just acts like state that is also synced to/from
 * sessionStorage::
 *
 *   const [myThing, setMyThing] = useSessionStorage("myThing")
 */

const useSessionStorage = (key, initialValue = null) => {
  const valueFromSessionStorage = sessionStorage.getItem(key) || initialValue;

  const [value, setValue] = useState(valueFromSessionStorage);

  useEffect(() => {
    // console.debug('hooks useSessionStorage useEffect', 'value=', value);
    if (value === null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
