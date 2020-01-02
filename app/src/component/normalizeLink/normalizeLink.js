const toNormalizeLink = (link) => {
    link = link.toLowerCase();
    
    if (!link.includes(' ')) return link;
    
    return link.replace(/\s+/g, '_');
}

export default toNormalizeLink;