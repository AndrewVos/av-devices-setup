const InputAdvice = ({ advice }) => {
  return (
    <div>
      <p className="smaller bold">{advice.heading}</p>
      <div>
        <ul className="hyphen-bullet no-padding caption">
          {advice.listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InputAdvice
