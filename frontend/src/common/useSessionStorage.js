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

function useSessionStorage(key, firstValue = null) {
  const initialValue = sessionStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInsessionStorage() {
      console.debug('hooks useSessionStorage useEffect', 'item=', item);

      if (item === null) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

export default useSessionStorage;
