import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import './App.css';
import Balance from './components/Balance/Balance';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import Input from './components/Input/Input';
import Section from './components/Section/Section';

export default function App() {
	const [balance, setBalance] = useState('');

	const handleSubmit = ({ deposit, contribution, years, rate }) => {
		let val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate));
		setBalance(formatter.format(val));
	}

	const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 });

	return (
		<Container>
			<Section>
				<Formik initialValues={{ deposit: '', contribution: '', years: '', rate: '' }} onSubmit={handleSubmit}
					validationSchema={Yup.object({
						deposit: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
						contribution: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
						years: Yup.number().required('Obligatorio').typeError('Debe ser un numero'),
						rate: Yup.number().required('Obligatorio').typeError('Debe ser un numero').min(0, 'El valor minimo es 0').max(1, 'El valor maximo es 1')
					})}>
					<Form>
						<Input name='deposit' label='Deposito inicial' />
						<Input name='contribution' label='Contribucion anual' />
						<Input name='years' label='Anios' />
						<Input name='rate' label='Interes estimado' />
						<Button type='button'>Calcular</Button>
					</Form>
				</Formik>
				{(balance !== '') ? <Balance>{`Balance final: ${balance}`}</Balance> : null}
			</Section>
		</Container>
	);
}



function compoundInterest(deposit, contribution, years, rate) {
	let total = deposit;

	for (let i = 0; i < years; i++) {
		total = (total + contribution) * (rate + 1);
	}

	return Math.round(total);
}
