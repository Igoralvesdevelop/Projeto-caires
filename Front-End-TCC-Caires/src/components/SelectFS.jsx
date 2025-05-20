import style from './SelectFS.module.css'

function SelectFS({text, name, id, handlerChange, options}){
  return(
      <div className={style.form_control}>
          <label htmlFor={name}>{text}</label>

          <select name={name} id={id} onChange={handlerChange}>
              <option value="">Selecione um nível de acesso</option>

              {
              options.map((option)=>(
                <option value={option.descricao} key={option.id_nivel}>{option.descricao}</option>
              ))
              }
          
          </select>

      </div>
  )


}
export default SelectFS