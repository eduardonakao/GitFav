export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
            super(root)

            this.tbody = this.root.querySelector('table tbody')

            this.update()
            this.onAdd()
        }

        update() {
            this.removeAllTr()

            this.entries.forEach(user => {
                const row = this.createRow()

                row.querySelector('.user img').src = `https://github.com/${user.login}.png`
                row.querySelector('.user a').href = `http://github.com/${user.login}`
                row.querySelector('.user img').alt = `Imagem de ${user.name}`
                row.querySelector('.user p').textContent = user.name
                row.querySelector('.user span').textContent = user.login
                row.querySelector('.repositories').textContent = user.public_repos
                row.querySelector('.followers').textContent = user.followers

                row.querySelector('.remove').onclick = () => {
                    const isOk = confirm('Tem certeza que deseja deletar essa linha?')

                    if(isOk) {
                        this.delete(user)
                    }
                }

                this.tbody.append(row)
            })
            
            
        }

        createRow() {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <tr>
                    <td class="user">
                        <img src="http://github.com/eduardonakao.png" alt="imagem de eduardonakao">
                        <a href="http://github.com/eduardonakao" target="_blank">
                            <p>Eduardo Nakao</p>
                            <span>eduardonakao</span>
                        </a>
                    </td>
                    <td class="repositories">
                        76
                    </td>
                    <td class="followers">
                        9589
                    </td>
                    <td>
                        <button class="remove">Remover</button>
                    </td>
                </tr>
                    `

                    return tr
        }

        removeAllTr() {
            this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
        }
}