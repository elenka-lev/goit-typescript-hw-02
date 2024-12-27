import s from './SearchBar.module.css'
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  onSubmit: (input: string) => void;
}
const SearchBar : React.FC<Props>  = ({ onSubmit  })  => {
  const [input, setInput] = useState<string>(''); // Локальный стейт для ввода

  const handleChangeInput = (evt : React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value); // Обновляем значение поля
  };

  const handleSubmit = (evt : React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (input.trim() === '') {
      toast.error('Please enter the name'); // Ошибка, если поле пустое
      return;
    }
    onSubmit(input); // Передаем введенный запрос в App
    setInput(''); // Очищаем поле
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={input}
          onChange={handleChangeInput}
          className={s.input}
        />
        <button type="submit" className={s.btn}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;