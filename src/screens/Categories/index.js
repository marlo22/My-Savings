import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { getSpendingCategories, deleteSpendingCategory } from '../../stores/actions/categories';
import { getCategories } from '../../stores/selectors/categories';

import { Text, Alert } from 'react-native';
import { List, ListItem, Left, Right, Fab, Icon, Container, Toast } from 'native-base';
import { Loader, ButtonIcon, ColorIndicator } from '../../components';

import { CategoryEditorModal } from '../../modals';

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

export const CategoriesScreen = ({}) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    
    try {
      await dispatch(getSpendingCategories());
    } finally {
      setLoading(false);
    }
  };

  const clearEditorData = () =>
    setEditorData(null);

  const deleteFn = async categoryId => {
    try {
      await dispatch(deleteSpendingCategory(categoryId));

      Toast.show({
        type: 'success',
        text: 'Kategoria została usunięta.'
      });
    } catch {
      Toast.show({
        type: 'danger',
        text: 'Wystąpił błąd podczas usuwania kategorii.'
      });
    }
  }

  if (loading) {
    return <Loader message="Trwa wczytywanie..." />
  }

  return (
    <Container>
      {categories.size ? (
        <List>
          {categories.keySeq().map((key => {
            const { name, color } = categories.get(key);
            return (
              <ListItem key={key}>
                <StyledLeft>
                  <ColorIndicator color={color} />
                  <Text>{name}</Text>
                </StyledLeft>
                <Right>
                  <ButtonContainer>
                    <ButtonIcon
                      name="edit"
                      onPress={() => setEditorData({ key, name, color })}
                    />
                    <ButtonIcon
                      name="close"
                      onPress={() =>
                        Alert.alert(
                          `Czy na pewno chcesz usunąć kategorię „${name}”?`, '',
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
        <Text>Brak dodanych kategorii.</Text>
      )}
      <AddButton position="bottomRight" onPress={() => setEditorData({})}>
        <Icon type="AntDesign" name="plus" />
      </AddButton>
      {editorData && (
        <CategoryEditorModal
          data={editorData}
          onClose={clearEditorData}
        />
      )}
    </Container>
  )

  return 
};

CategoriesScreen.propTypes = {
  getSpendingCategories: PropTypes.func.isRequired,
  deleteSpendingCategory: PropTypes.func.isRequired,
  categories: ImmutablePropTypes.map.isRequired
};

export default CategoriesScreen;