function trocarSite() {
    var select = document.getElementById('selSite')
    var siteSelecionado = select.value
    var blog = document.getElementById('conteudo-windows')
    var orkut = document.getElementById('conteudo-orkut')

    if (siteSelecionado == 'blog') {
        orkut.style.display = 'none'
        blog.style.display = 'flex'
    } else if (siteSelecionado == 'orkut') {
        blog.style.display = 'none'
        orkut.style.display = 'flex'
    }
}