import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, subDays, addDays, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Actions, CurrentDate, Next, Previous } from './styles';

export default function SelectorDate({ date, onChange }) {
  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM", {
        locale: pt,
      }),
    [date]
  );

  function handleIncrementDate() {
    const dateIncremented = addDays(date, 1);
    onChange(dateIncremented);
  }

  function handleDecrementDate() {
    const dateIncremented = subDays(date, 1);
    if (!isAfter(new Date(), date)) {
      onChange(dateIncremented);
    }
  }

  return (
    <Actions>
      <Previous onPress={handleDecrementDate}>
        <Icon name="chevron-left" size={36} color="#FFF" />
      </Previous>
      <CurrentDate> {dateFormatted} </CurrentDate>
      <Next onPress={handleIncrementDate}>
        <Icon name="chevron-right" size={36} color="#FFF" />
      </Next>
    </Actions>
  );
}
