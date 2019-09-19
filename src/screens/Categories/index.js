import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSpendingCategories, deleteSpendingCategory } from '../../stores/actions/categories';
import { getCategories } from '../../stores/selectors/categories';

import { Text, Alert } from 'react-native';
import { List, ListItem, Left, Right, Fab, Icon, Container } from 'native-base';
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

export const CategoriesScreen = ({ userId, categories, getSpendingCategories, deleteSpendingCategory }) => {
  const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    
    try {
      await getSpendingCategories();
    } finally {
      setLoading(false);
    }
  };

  const clearEditorData = () =>
    setEditorData(null);

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
                            { text: 'Tak', onPress: () => deleteSpendingCategory(key) }
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

const mapStateToProps = state => ({
  categories: getCategories(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getSpendingCategories,
    deleteSpendingCategory
  }, dispatch);

CategoriesScreen.propTypes = {
  getSpendingCategories: PropTypes.func.isRequired,
  deleteSpendingCategory: PropTypes.func.isRequired,
  categories: ImmutablePropTypes.map.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesScreen);