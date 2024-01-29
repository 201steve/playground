class Keyboard {
    #switchEl;
    #fontSelectEl;
    #containerEl;
    #keyboardEl;
    #inputGroupEl;
    #inputEl;
    #keyPress = false;
    #mouseDown = false;
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
        this.#inputEl.addEventListener("input",this.#onInput)
        this.#keyboardEl.addEventListener("mousedown",this.#onMouseDown.bind(this))
        document.addEventListener("mouseup",this.#onMouseUp.bind(this))
    }
    #onChangeTheme(event){
        document.documentElement.setAttribute("theme",event.target.checked ? "dark-mode":"")
    }
    #onChangeFont(event){
        document.body.style.fontFamily = event.target.value
    }

    #onKeyDown(event){
        if(this.#mouseDown) return;
        this.#keyPress =true;
        this.#inputGroupEl.classList.toggle("error",/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key))
        this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add("active")
    }

    #onKeyUp(event){
        if(this.#mouseDown) return;
        this.#keyPress = false;
        this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.remove("active")

    }

    #onInput(event){
        event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,"")
    }

    #onMouseDown(event){
        if(this.#keyPress) return;
        this.#mouseDown =true;
        event.target.closest("div.key")?.classList.add("active")
    }
    #onMouseUp(event){
        if(this.#keyPress) return;
        this.#mouseDown =false;
        const keyEl = event.target.closest("div.key")
        const isActive = !!keyEl?.classList.contains("active")
        const hasVal = keyEl?.dataset.val;
        if(isActive&& !!hasVal &&hasVal !=="Space" && hasVal !=="Backspace"){
            this.#inputEl.value  = this.#inputEl.value  + hasVal
        }
        if(isActive && hasVal === "Space"){
            this.#inputEl.value = this.#inputEl.value + " "
        }
        if(isActive && hasVal === "Backspace"){
            this.#inputEl.value = this.#inputEl.value.slice(0,-1)
        }
        this.#keyboardEl.querySelector(".active")?.classList.remove("active")

    }
}
new Keyboard()