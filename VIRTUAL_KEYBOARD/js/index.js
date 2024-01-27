class Keyboard {
    #switchEl;
    #fontSelectEl;
    #containerEl;
    #keyboardEl;
    #inputGroupEl;
    #inputEl;
    constructor() {
        this.#assignElement()
        this.#addEvent()

    }
    #assignElement(){
        this.#containerEl = document.getElementById("container")
        //getElementById는 document에서만 찾을 수 있다. element단위로는 찾을 수 없다.
        this.#switchEl = this.#containerEl.querySelector("#switch")
        this.#fontSelectEl = this.#containerEl.querySelector("#font")
        this.#keyboardEl = this.#containerEl.querySelector("#keyboard")
        this.#inputGroupEl =this.#containerEl.querySelector("#input-group")
        this.#inputEl =this.#inputGroupEl.querySelector("#input")
    }

    #addEvent(){
        this.#switchEl.addEventListener("change",this.#onChangeTheme)
        this.#fontSelectEl.addEventListener("change",this.#onChangeFont)
        document.addEventListener("keydown",this.#onKeyDown.bind(this))
        document.addEventListener("keyup",this.#onKeyUp.bind(this))
        this.#inputEl.addEventListener("input",(event)=>{
            this.#inputEl.value = this.#inputEl.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,"")
            }
        )
    }
    #onChangeTheme(event){
        document.documentElement.setAttribute("theme",event.target.checked ? "dark-mode":"")
    }
    #onChangeFont(event){
        document.body.style.fontFamily = event.target.value
    }

    #onKeyDown(event){
        this.#inputGroupEl.classList.toggle("error",/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key))
        this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add("active")
    }

    #onKeyUp(event){
        this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.remove("active")
    }


}
new Keyboard()