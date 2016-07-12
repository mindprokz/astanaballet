// Принимает объект с настройками для меню
export default class FloatMenu{

  static init(obj){

    if(window.pageYOffset > obj.height){
      obj.elem.classList.add(obj.first_class);
      obj.elem.classList.add(obj.second_class);
    }else{
      obj.elem.classList.add(obj.first_class);
    }

    window.addEventListener('scroll', () => {

      if(window.pageYOffset > this.height &&  this.active_class === this.first_class){
        this.elem.classList.add(this.second_class);
        this.active_class = this.second_class;
      }else if(window.pageYOffset < this.height && this.active_class === this.second_class ){
        this.elem.classList.remove(this.second_class);
        this.active_class = this.first_class;
      }

	});  
  }
}  
