import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getSpendings, deleteSpending } from '../../stores/actions/spendings';
import { getAllSpendings } from '../../stores/selectors/spendings';
import { getSpendingCategories } from '../../stores/actions/categories';
import { getCategoriesFetchStatus, getCategories } from '../../stores/selectors/categories';

import { Text, Alert } from 'react-native';
import { List, ListItem, Left, Right, Fab, Icon, Container, Toast } from 'native-base';
import { Loader, ButtonIcon, ColorIndicator } from '../../components';

import { SpendingEditorModal } from '../../modals';

import { formatDate } from '../../utils';

import { secondaryColor } from '../../themes';

const StyledLeft = styled(Left)`
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const AddButton = styled(Fab)`
  background-color: ${secondaryColor};
`;

export const SpendingsScreen = () => {
  const dispatch = useDispatch();
  const areCategoriesFetched = useSelector(getCategoriesFetchStatus);
  const spendings = useSelector(getAllSpendings);
  const categories = useSelector(getCategories);

  const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    fetchSpendings();
  }, []);

  const fetchSpendings = async () => {
    setLoading(true);
    
    try {
      await dispatch(getSpendings());

      if (!areCategoriesFetched) {
        await dispatch(getSpendingCategories());
      }
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = categoryId =>
    categories.getIn([categoryId, 'color']);

  const clearEditorData = () =>
    setEditorData(null);

  const deleteFn = async spendingId => {
    try {
      await dispatch(deleteSpending(spendingId));

      Toast.show({
        type: 'success',
        text: 'Wydatek został usunięty.'
      });
    } catch {
      Toast.show({
        type: 'danger',
        text: 'Wystąpił błąd podczas usuwania wydatku.'
      });
    }
  }

  if (loading) {
    return <Loader message="Trwa wczytywanie..." />
  }

  return (
    <Container>
      {spendings.size ? (
        <List>
          {spendings.keySeq().map((key => {
            const { date, cost, name, category } = spendings.get(key);
            return (
              <ListItem key={key}>
                <StyledLeft>
                  <ColorIndicator color={getCategoryColor(category)} />
                  <Text>{formatDate(date, 'short')} - </Text>
                  <Text>{name} - </Text>
                  <Text>{' '}{cost} zł</Text>
                </StyledLeft>
                <Right>
                  <ButtonContainer>
                    <ButtonIcon
                      name="edit"
                      onPress={() => setEditorData({ key, date, name, cost, category })}
                    />
                    <ButtonIcon
                      name="close"
                      onPress={() =>
                        Alert.alert(
                          `Czy na pewno chcesz usunąć wydatek „${name}”?`, '',
                          [
                            { text: 'Nie' },
                            { text: 'Tak', onPress: () => deleteFn(key) }
                          ]
                        )
                      }
                    />
                  </ButtonContainer>
                </Right>
              </ListItem>
            );
          }))}
        </List>
      ) : (
        <Text>Brak dodanych wydatków.</Text>
      )}
      <AddButton position="bottomRight" onPress={() => setEditorData({})}>
        <Icon type="AntDesign" name="plus" />
      </AddButton>
      {editorData && (
        <SpendingEditorModal
          data={editorData}
          onClose={clearEditorData}
        />
      )}
    </Container>
  )

  return 
};

export default SpendingsScreen;