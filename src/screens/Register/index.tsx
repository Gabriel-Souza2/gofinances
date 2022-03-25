import React, { useState } from 'react';
import { Modal } from 'react-native'; 

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect, Category } from '../CategorySelect';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from './style';

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categorias'
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleSetCategory(category: Category) {
        setCategory(category);
    }

    function handleCloseCategoryModal() {
        setCategoryModalOpen(false);
    }
    return (
       <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>
            <Form>
                <Fields>
                    <Input 
                        placeholder='Nome'
                    />
                    <Input 
                        placeholder='Preço'
                    />
                    <TransactionsType>
                        <TransactionTypeButton 
                            type='up'
                            title="Income"
                            onPress={() => handleTransactionsTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type='down'
                            title="Outcome"
                            onPress={() => handleTransactionsTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsType>
                    <CategorySelectButton title={category.name} onPress={handleOpenCategoryModal}/>
                </Fields>
                <Button title='Enviar' />
            </Form>
            <Modal visible={categoryModalOpen} >
                <CategorySelect 
                    category={category}
                    setCategory={handleSetCategory}
                    closeSelectCategory={handleCloseCategoryModal}
                />
            </Modal>
       </Container>
    );
}