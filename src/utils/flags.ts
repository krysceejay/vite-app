import Nigeria from '/asset/img/flags/nigeria.png'
import Senegal from '/asset/img/flags/senegal.png'

const renderFlag = (currency?: string): string => {
  let flag: string
  switch (currency) {
    case 'NGN':
      flag = Nigeria
      break;
    case 'XOF':
      flag = Senegal
      break;
    default:
      flag = Nigeria
      break;
  }

  return flag
}

export default renderFlag