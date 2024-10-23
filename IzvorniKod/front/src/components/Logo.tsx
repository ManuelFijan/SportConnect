function Logo() {
    /* stavljen logo2 jer je bolja rezolucija
    ako zelim vratit logo samo ga zamijenim u src, a u className umjesto w-[60%] stavim w-auto h-auto*/
    return (
        <>
            <img src="/logo2.png" alt="Logo" className="w-[60%] pt-[2rem]"/>
        </>
    )
}

export default Logo;