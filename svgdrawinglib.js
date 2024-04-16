

/*---------------------------SVG Globals--------------------------------------*/
let xmlns = "http://www.w3.org/2000/svg";

/*helper*/
function getindexofitemindistinctarray( A, i){
    for(let t = 0; t < A.length; t += 1 ){
        if(A[t] === i){
            return t;
        }
    }
    return null;
}
function getColorCode() {
      var makeColorCode = '0123456789ABCDEF';
      var code = '#';
      for (var count = 0; count < 6; count++) {
         code =code+ makeColorCode[Math.floor(Math.random() * 16)];
      }
      return code;
   }


/*------------------------------primitives------------------------------------*/
function getsvgMAINELEM( w, h ){
	let e = document.createElementNS( xmlns, "svg" );
	e.setAttributeNS(null, "viewBox", "0 0 " + w + " " + h );
    e.setAttributeNS(null, "width", w.toString()+"px" );
    e.setAttributeNS(null, "height", h.toString()+"px" );
    e.style.display = "block";
    return e;
}
function getsvgpath( clname ){
	let e = document.createElementNS( xmlns, "g" );
	e.setAttribute( "class", clname );  
    return e;
}

function getdot( cx, cy, r, name, linkit, cocol, colstro ){ //gon
    let cont = document.createElementNS( xmlns, 'g' );

    let ri = Math.sqrt( (r*r)-((r/2)*(r/2)) );
    let po = "";
    po += (cx+r).toString()+","+cy.toString()+" "; //r 0
    po += (cx+(r/2)).toString()+","+(cy+ri).toString()+" "; //u 1
    po += (cx-(r/2)).toString()+","+(cy+ri).toString()+" "; //uu 2
    po += (cx-r).toString()+","+cy.toString()+" "; //l 3
    po += (cx-(r/2)).toString()+","+(cy-ri).toString()+" "; //o 4
    po += (cx+(r/2)).toString()+","+(cy-ri).toString()+" "; //oo 5

    let popo = document.createElementNS( xmlns, 'polygon' );
    popo.setAttribute( 'title', name );
    popo.setAttribute( 'id', name+"dot" );
    popo.setAttribute( 'fill' , cocol     );
    popo.setAttribute( 'stroke' , colstro     );
    popo.setAttribute( 'name' , cocol     );
    popo.setAttribute( 'points', po );
    if( linkit != "" ){
        popo.setAttribute( "onclick", "window.open('"+linkit+"')" );
    }
    let tit = document.createElementNS("http://www.w3.org/2000/svg","title")
    tit.textContent = name;
    
    popo.appendChild( tit ); 
    cont.appendChild( popo ); 

    return cont;
}

function getlabdot( cx, cy, r, name, linkit, cocol, colstro ){ //horizontaly oriented label
    let cont = document.createElementNS( xmlns, 'g' );

    let ri = Math.sqrt( (r*r)-((r/2)*(r/2)) );
    let po = "";
    po += (cx+r).toString()+","+cy.toString()+" "; //r 0
    po += (cx+(r/2)).toString()+","+(cy+ri).toString()+" "; //u 1
    po += (cx-(r/2)).toString()+","+(cy+ri).toString()+" "; //uu 2
    po += (cx-r).toString()+","+cy.toString()+" "; //l 3
    po += (cx-(r/2)).toString()+","+(cy-ri).toString()+" "; //o 4
    po += (cx+(r/2)).toString()+","+(cy-ri).toString()+" "; //oo 5

    let popo = document.createElementNS( xmlns, 'polygon' );
    popo.setAttribute( 'title', name );
    popo.setAttribute( 'id', name+"dot" );
    popo.setAttribute( 'fill' , cocol     );
    popo.setAttribute( 'stroke' , colstro     );
    popo.setAttribute( 'name' , cocol     );
    popo.setAttribute( 'points', po );
    if( linkit != "" ){
        popo.setAttribute( 'onclick', linkit );
    }
    let tit = document.createElementNS(xmlns,"title")
    tit.textContent = name;
    let label = getsvglabel(name, (cx+r), (cy+Math.round(r/2)), 0 );
    popo.appendChild( tit ); 
    cont.appendChild( popo );
    cont.appendChild( label );  
    return cont;
}

function getsquare( cx, cy, r, name, linkit, cocol, colstro ){
    let rect = document.createElementNS( xmlns,'rect' );
    rect.setAttributeNS( null,'x',cx );
    rect.setAttributeNS( null,'y',cy );
    rect.setAttributeNS( null,'width', r.toString() );
    rect.setAttributeNS( null,'height',r.toString() );
    rect.setAttributeNS( null,'fill', cocol );
    rect.setAttributeNS( null,'stroke', colstro );
    return rect;
}

function getrect( x, y, w, h, c){
    let rect = document.createElementNS( xmlns,'rect' );
    rect.setAttributeNS( null,'x',x );
    rect.setAttributeNS( null,'y',y );
    rect.setAttributeNS( null,'width', w.toString() );
    rect.setAttributeNS( null,'height',h.toString() );
    rect.setAttributeNS( null,'fill', c );
    return rect;
}

function getsvglabel(text, x, y, ang){
    let label = document.createElementNS(xmlns,"text")
    label.textContent = text;
    label.setAttribute( 'x', x );
    label.setAttribute( 'y', y );
    //label.setAttribute( 'alignment-baseline', "hanging" );
    label.setAttribute( 'transform', 'rotate('+ang.toString()+', '+x.toString()+', '+y.toString()+')');
    
    return label;
}

function getrounddotlab( cx, cy, r, ang, name, cocol, colstro, linkit ){ //vertical aligned label
    let retsvgel = document.createElementNS( xmlns, 'g' );
    let popo = document.createElementNS( xmlns, 'circle' );
    popo.setAttribute( 'title', name );
    popo.setAttribute( 'id', name+"dot" );
    popo.setAttribute( 'fill' , cocol     );
    popo.setAttribute( 'stroke' , colstro     );
    popo.setAttribute( 'name' , cocol     );
    popo.setAttribute( 'cx' , cx     );
    popo.setAttribute( 'cy' , cy     );
    popo.setAttribute( 'r' , r     );
    if( linkit != "" ){
        popo.setAttribute( 'onclick', linkit );
    }
    let label = document.createElementNS(xmlns,"text")
    label.textContent = name;
    label.setAttribute( 'x', (cx+(r+(r/2)) ));
    label.setAttribute( 'y', (cy+Math.round(r/2)) );
    label.setAttribute( 'transform', 'rotate('+ang.toString()+', '+cx.toString()+', '+cy.toString()+')');
    retsvgel.appendChild( popo );
    retsvgel.appendChild( label );
    return retsvgel;
}

function getlabeledcircle( cx, cy, r, name, strokewi, colstro, linkit ){ //horizontal aligned label
    let retsvgel = document.createElementNS( xmlns, 'g' );
    let popo = document.createElementNS( xmlns, 'circle' );
    popo.setAttribute( 'title', name );
    popo.setAttribute( 'id', name+"dot" );
    popo.setAttribute( 'fill' , "none"     );
    popo.setAttribute( 'stroke-width' , strokewi );
    popo.setAttribute( 'stroke' , colstro     );
    popo.setAttribute( 'cx' , cx     );
    popo.setAttribute( 'cy' , cy     );
    popo.setAttribute( 'r' , r     );
    if( linkit != "" ){
        popo.setAttribute( 'onclick', linkit );
    }
    let label = document.createElementNS(xmlns,"text")
    label.textContent = name + "kn";
    label.setAttribute( 'x', cx+r );
    label.setAttribute( 'y', cy+(r-2) );
    label.setAttribute( 'transform', 'rotate(0, '+cx.toString()+', '+cy.toString()+')');
    retsvgel.appendChild( popo );
    retsvgel.appendChild( label );
    return retsvgel;
}
function getstraitlinelabelatend( x1, y1, x2, y2, c, w, l, dg ){
    let retsvgel = document.createElementNS( xmlns, 'g' );
    let popo = document.createElementNS( xmlns, 'line' );
    popo.setAttribute( 'stroke' , c );
    popo.setAttribute( 'stroke-width' , w );
    popo.setAttribute( 'x1' , x1     );
    popo.setAttribute( 'y1' , y1     );
    popo.setAttribute( 'x2' , x2     );
    popo.setAttribute( 'y2' , y2     );
    let label = document.createElementNS(xmlns,"text")
    label.textContent = l;
    
    label.setAttribute( 'x', x2 );
    label.setAttribute( 'y', y2 );
    label.setAttribute( 'transform', 'rotate('+dg+', '+x2.toString()+', '+y2.toString()+')');
    retsvgel.appendChild( popo );
    retsvgel.appendChild( label );
    return retsvgel;
}
function getstraitline( x1, y1, x2, y2, c, w ){
    let popo = document.createElementNS( xmlns, 'line' );
    popo.setAttribute( 'stroke' , c );
    popo.setAttribute( 'stroke-width' , w );
    popo.setAttribute( 'x1' , x1     );
    popo.setAttribute( 'y1' , y1     );
    popo.setAttribute( 'x2' , x2     );
    popo.setAttribute( 'y2' , y2     );

    return popo;
}
/*------------------------PLOT___ VISUALISATIONS------------------------------*/
function getbarplot( tw, th, scale, move, data, namearray, linksss ){ //data is dict of array of arrays
    
    const ll = namearray.length;
    const keysof =  data[ namearray[0] ][ 0 ] ; 
    const kl = keysof.length;
    //console.log(data)
    //const yinc = Math.round( th  / (kl*ll) );
    let xinc = 20;//Math.round( tw  / (kl*ll) );
    if(tw < (ll*xinc*kl)){
        
        tw = ll*xinc*kl;
    }
    
    let mainsvgelem = getsvgMAINELEM( (tw+move).toString(), (th+move).toString() );
    let posx = 0;
    let posy = 10;
    let colcod = [];
    for( let l = 0; l < ll; l+=1 ){
        colcod.push( getColorCode( ) );
    }
    const scaleval = 10000;
    let maxval = 0;
    for( let k in data ){
        for(let i in data[k][1]){
            if(data[k][1][i] > maxval){
                maxval = data[k][1][i];
            }
        }
    }
    for( let kk = 0; kk < kl; kk += 1 ){
        //get first key / token and build for every text a bar
        let tempcol = "white";
        if( kk%2 == 0){
            tempcol = "gray";
        }
        mainsvgelem.appendChild( getrect(posx, posy, (ll*xinc), th, tempcol) );
        mainsvgelem.appendChild( getsvglabel( keysof[kk], posx, posy+10, 35 ) );
        posy += 50;
        for( let i = 0; i < ll; i += 1 ){
            //mainsvgelem.appendChild( getsvglabel( namearray[i], posx, posy, 35 ) );
            let toadd = data[ namearray[ i ] ][ 1 ][ kk ];
            
            mainsvgelem.appendChild( getstraitlinelabelatend( posx+5, posy, posx+5, posy+((toadd*(th-move))/ maxval), colcod[i], 10, toadd.toString() +" :: "+namearray[ i ], 90 ) );
            posx += xinc;
        }
        //posx += xinc;
        posy = 10;
    }
    return mainsvgelem;
}

function gethistoSVG(tw, th, scale, move, data, linksss){ //dict input
    const ll = len( data ); // data is a dict
    const yinc = Math.round( th  / ll );
    let xinc = Math.round( tw  / ll );
    if(xinc < 20){
        xinc = 20;
        tw = 20*ll;
    }
    let mainsvgelem = getsvgMAINELEM( (tw+30).toString(), (th+120).toString() );
    let posx = 0;
    let posy = 20;
    let i = 0;
    let maxval = 0;
    for( let k in data ){
        if(data[k] > maxval){
            maxval = data[k];
        }
    }
    //console.log(maxval , "maxval");
    for( let k in data ){
        posx = ( i * xinc) + 20;
        const labtext =  k + " (" + k.codePointAt(0).toString(16) + ")";
        mainsvgelem.appendChild( getsvglabel( labtext, posx, posy, 90 ) );
        let toadd = ((data[k]*th)/maxval);
        if(toadd < 30){
            toadd = toadd*2;
        }
        
        mainsvgelem.appendChild( getstraitlinelabelatend( posx+5, posy+60, posx+5, posy+60+toadd, getColorCode(), 5, data[k].toString(), 90 ) );
        i += 1;
    }
    return mainsvgelem;
}
function gethistoSVGbare(tw, th, scale, move, data, linksss){ //dict input
    const ll = len( data ); // data is a dict
    const yinc = Math.round( th  / ll );
    let xinc = Math.round( tw  / ll );
    if(xinc < 20){
        xinc = 20;
        tw = 20*ll;
    }
    let mainsvgelem = getsvgMAINELEM( (tw+30).toString(), (th+120).toString() );
    let posx = 0;
    let posy = 20;
    let i = 0;
    let maxval = 0;
    for( let k in data ){
        if(data[k] > maxval){
            maxval = data[k];
        }
    }
    //console.log(maxval , "maxval");
    for( let k in data ){
        posx = ( i * xinc) + 50; //fixed length from label
        mainsvgelem.appendChild( getsvglabel( i.toString() + " " + k, posx, posy, 90 ) );
        let toadd = ((data[k]*th)/maxval);
        /*if(toadd < 30){
            toadd = toadd*2;
        }*/
        
        mainsvgelem.appendChild( getstraitlinelabelatend( posx+5, posy+60, posx+5, posy+60+toadd, getColorCode(), 5, data[k].toString(), 90 ) );
        i += 1;
    }
    return mainsvgelem;
}

/*------------------------MAP____ VISUALISATIONS------------------------------*/
function getheatmapsquares( tw, th, scale, move, data, namearray, linksss ){

    let mainsvgelem = getsvgMAINELEM( (tw+move).toString(), (th+move).toString() );
    
    let r = 20; //size of squares
    const ll = fnames.length;
    //console.log(data, fnames)
    //this gives a regular grid for the points
    let yinc = Math.round( th  / ll );
    let xinc = Math.round( tw  / ll );
    r = Math.min(yinc, xinc)-4;
    if(r < 2){
        r = 2;
    }
   
    let maxval = 0;
    for( let i = 0; i < ll; i += 1){
        for( let t = 0; t < ll; t += 1){
            if(data[i][t] > maxval){
                maxval = data[i][t];
            }
        }
    }
    
    
    let posy = 0;
    let posx = 0;
    //lables
    for( let i = 0; i < ll; i += 1){ //lines
        posy = (i * yinc) + move + (r/2);
        posx = 0; 
        mainsvgelem.appendChild( getsvglabel(fnames[i], posx, posy, 0) );
        if( i == 0 ){
            for( let t = 0; t < ll; t += 1){ //columns
                posx = (t * xinc) + move + (r/2); 
                mainsvgelem.appendChild( getsvglabel(fnames[t], posx, posy-(r/2)-2, -90) );
            }
        }
    }
    //squares
    const stokeunite = getColorCode();
    for( let i = 0; i < ll; i += 1){ //lines
        //console.log( fnames[i] );
        posy = ( (i) * yinc ) + move;
        posx = move; 
        for( let t = 0; t < ll; t += 1){ //columns
            posx = (t * xinc) + move; 
            //console.log(fnames[t], i, t, posx, posy);
            const cpst = 1;//(1-((data[i][t]*1.0)/maxval)).toString();
            const colv = ((data[i][t]*255.0)/maxval).toString();
            const heatcolor = "rgba("+colv+","+colv+","+colv+", "+ cpst +")";
            //console.log(heatcolor);
            mainsvgelem.appendChild( getsquare( posx, posy, r, fnames[i]+" - "+fnames[t], "", heatcolor,  stokeunite) );
        }
    }
    return mainsvgelem;
}

/*------------------------CLUSTER VISUALISATIONS------------------------------*/
function drawtsnesvg( tw, th, scale, move, dimred1, namearray, linksss ){ //dimred array length == name array length !!! 
    let mainsvgelem = getsvgMAINELEM( tw.toString(), th.toString() );
    let maxx = 0;
    let maxy = 0;
    for( let i = 0; i < dimred1.length; i += 1) {
         
        
        if(Math.abs(dimred1[i][0])>maxx){maxx = Math.abs(dimred1[i][0])};
        if(Math.abs(dimred1[i][1])>maxy){maxy = Math.abs(dimred1[i][1])};

    }
    //console.log(dimred1);
    let incx = tw/(maxx*2);
    let incy = th/(maxy*2);
    for( let i = 0; i < dimred1.length; i += 1) {
        let nn = namearray[i];
        
        
        //tsne
        let posx =  (dimred1[i][0]*incx)+(tw/2) ;
        let posy =  (dimred1[i][1]*incy)+(th/2) ;
        
        //console.log(posx,posy,nn)
        if( posx > tw || posy > th ){
            console.log(nn, "tSNE display error -------- at ", posx , "(max: ", tw ,")", posy , "(max: ", th ,")" );
        }
        //svg
        const c1 = getColorCode();
        const c2 = getColorCode();
        
        mainsvgelem.appendChild( getlabdot( posx, posy, 10, nn, linksss, c1, c2 ) );
    }
    return mainsvgelem;
}

function drawmdsangsvg( tw, th, scale, move, dimred1, namearray, linksss ){ //dimred array length == name array length !!! 
    let mainsvgelem = getsvgMAINELEM( tw.toString(), th.toString() );
    let maxx = 0;
    let maxy = 0;
    for( let i = 0; i < dimred1.length; i += 1) {
         
        
        if(Math.abs(dimred1[i][0])>maxx){maxx = Math.abs(dimred1[i][0])};
        if(Math.abs(dimred1[i][1])>maxy){maxy = Math.abs(dimred1[i][1])};

    }
    
    let incx = tw/(maxx);
    let incy = th/(maxy);
    console.log(maxx, incx, maxy, incy);
    for( let i = 0; i < dimred1.length; i += 1 ){
        let nn = namearray[i];
        
        
        //tsne
        let posx =  dimred1[i][0]*incx;
        let posy =  dimred1[i][1]*incy;
        
        //console.log(posx,posy,nn)
        if( posx > tw || posy > th ){
            console.log(nn, "tSNE display error -------- at ", posx , "(max: ", tw ,")", posy , "(max: ", th ,")" );
        }
        //svg
        const c1 = getColorCode();
        const c2 = getColorCode();
        
        mainsvgelem.appendChild( getlabdot( posx, posy, 10, nn, linksss, c1, c2 ) );
    }
    return mainsvgelem;
}

function drawhclust( tw, th, scale, move, hclustar, linksss ){ //strong hierarchical
    let mainsvgelem = getsvgMAINELEM( tw.toString(), (th+move).toString() );
    const offsety = 100; //200;
    const offsetx = 10; //200;
    const r = 10;
    //this gives a regular grid for the points
    let yinc = Math.round( (th - (offsety*2)) / hclustar[0].length );
    let xinc = Math.round( (tw - (offsetx*2)) / hclustar[0][ hclustar[0].length-1 ][0].length );
    //console.log(xinc, yinc);
    let ll = hclustar[0].length-1 ;
    let posy =  yinc + offsety + move;
    let cc = [];
    let lastpos = [];
    let lastweight = [];
    //draw sorted result layer (every node is a cluster)
    for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){ //get last clusterlayer wich gives the over all sorting
        //dar dot and name
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        let nn = hclustar[1][ indexofthing ];//+" "+indexofthing.toString();
        //console.log(ci, nn, indexofthing);
        const c1 = getColorCode();
        cc.push(c1);
        lastpos.push([0,0]);
        lastweight.push(1);
        const c2 = getColorCode();
        let posx =  (ci *xinc ) + offsetx ;
        mainsvgelem.appendChild( getrounddotlab( posx, posy, r, -90, nn, c1, c2, linksss ) );     
    }
    //determin the layer connection width
    let mindi = Infinity;
    let maxdi = 0;
    for(let cl = 0; cl < hclustar[2].length; cl+=1){ //done use the first layer use the second layer and dont use the last one
        for(let ci = 0; ci < hclustar[2][cl].length; ci+=1){
            
            for(let cp = 0; cp < hclustar[2][cl][ci].length; cp += 1 ){
                if( hclustar[2][cl][ci][cp] < mindi ){
                    mindi = hclustar[2][cl][ci][cp];
                }
                if( hclustar[2][cl][ci][cp]> maxdi ){
                    maxdi = hclustar[2][cl][ci][cp];
                }
            }
            
        }
    }
    mindi += 1;
    maxdi += 1;
    //darw connections to join clusters
    const maxwidth = 20;
    let sw = (mindi * maxwidth) / maxdi;
    const swv = 5.0;
    console.log(mindi, maxdi, sw);
    for(let cl = 0; cl < hclustar[0].length; cl+=1){ //done use the first layer use the second layer and dont use the last one
        //console.log("Clusterlayer ", cl);
        let posy1 = ( (cl+1) * yinc ) + offsety + move;
        let posy2 = ( (cl+2) * yinc ) + offsety + move;
        
        for(let ci = 0; ci < hclustar[0][cl].length; ci+=1){
            
            //draw a line from
            let firstindex = hclustar[0][cl][ci][0];
            
            let g = getindexofitemindistinctarray( hclustar[ 0 ][ ll ][0], firstindex );
            const c1 = cc[g];
            sw =  ((hclustar[2][cl][ci][ hclustar[2][cl][ci].length-1 ] * maxwidth) / maxdi ); //maybe as label????
            if(sw < 1){
                sw = sw * 10;
            }
            if(sw > maxwidth){
                sw = sw/10;
            }
            if(sw == 0){
                sw = 1;
            }
            //console.log("Cluster ", ci, sw );
            
            let posx = (g*xinc)+offsetx; 
            lastpos[g][0] = posx;
            lastpos[g][1] = posy2;
            lastweight[g] = sw;
            /*for(let i = 0; i < HCLU[0][cl][ci].length; i += 1){
                console.log("Name ", HCLU[1][HCLU[0][cl][ci][i]]);
            }*/
               
            mainsvgelem.appendChild( getstraitline( posx, posy1, posx, posy2, c1, swv ) );    
        }
    }

    //draw the horizontal line
    for(let g = 0; g < lastpos.length; g += 1){
        const c1 = cc[g];
        let x2 = lastpos[g][0];
        let y2 = lastpos[g][1];
        
        for(let ig = g; ig > -1; ig -= 1){
            //console.log("i- i y y- ", ig, g, y2, lastpos[ig][1]);
            if( lastpos[ig][1] > y2 ){
                x2 = lastpos[ig][0];
                y2 = lastpos[ig][1];
                sw = lastweight[ig]; //maxbe as label ???
                break;
            }
        }
        mainsvgelem.appendChild( getstraitline( 0, lastpos[g][1], tw, lastpos[g][1], "#d3d3d3", 1 ) );
        mainsvgelem.appendChild( getstraitline( lastpos[g][0], lastpos[g][1], x2, lastpos[g][1], c1, swv ) );  
    }
    return mainsvgelem;
}

function drawhclustheat( tw, th, scale, move, hclustar, dmts, linksss ){
    //console.log(dmts);
    const offsety = move; //200;
    const offsetx = 10; //200;
    let mainsvgelem = getsvgMAINELEM( (tw+move).toString(), ((th*2)+move).toString() );
    
    const r = 10;
    let rs = 10;
    //this gives a regular grid for the points
    let yinc = Math.round( ((th) - (offsety)) / hclustar[0].length );
    let xinc = Math.round( (tw - (offsetx)) / hclustar[0][ hclustar[0].length-1 ][0].length );
    rs = Math.min(yinc, xinc)-4;
    if(rs < 2){
        rs = 2;
    }
    //console.log(xinc, yinc);
    let ll = hclustar[0].length-1 ;
    let posy =  offsety-r;
    let posx = offsetx;
    let cc = [];
    let lastpos = [];
    let lastweight = [];
    //maxval heat map
    let maxval = 0;
    for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        for(let cii = 0; cii < hclustar[ 0 ][ ll ][0].length; cii+=1 ){
            let indexofthing2 = hclustar[ 0 ][ ll ][0][ cii ];
            if( dmts[indexofthing][indexofthing2] > maxval ){
                maxval = dmts[indexofthing][indexofthing2];
            }
        }
        
    }
    //lables vertical
    for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){ //get last clusterlayer wich gives the over all sorting
        //dar dot and name
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        let nn = hclustar[1][ indexofthing ];//+" "+indexofthing.toString();
        posx =  ( ci * xinc ) + offsetx + (r/2); 
        mainsvgelem.appendChild( getsvglabel( nn, posx, posy-3, -60 ) );
        //mainsvgelem.appendChild( getrounddotlab( posx, posy, r, -90, nn, c1, c2, linksss ) );     
    }
     
    //squares
    for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        posy = ( (ci) * yinc ) + (offsety);
        posx = offsetx; 
        
        for(let cii = 0; cii < hclustar[ 0 ][ ll ][0].length; cii+=1 ){ //columns
            let indexofthing2 = hclustar[ 0 ][ ll ][0][ cii ];
            //console.log(indexofthing, indexofthing2, dmts[indexofthing][indexofthing2], hclustar[1][ indexofthing ], hclustar[1][ indexofthing2 ]);
            //console.log( fnames[i] );
                const c1 = getColorCode();
                cc.push(c1);
           
                posx = (cii * xinc) + offsetx; 
                
                const cpst = 1;//(1-((data[i][t]*1.0)/maxval)).toString();
                const colv = ((dmts[indexofthing][indexofthing2]*255.0)/maxval).toString();
                const heatcolor = "rgba("+colv+","+colv+","+colv+", "+ cpst +")";
                //console.log(heatcolor);
                
                mainsvgelem.appendChild( getsquare( posx, posy, rs, hclustar[1][ indexofthing ]+" - "+hclustar[1][ indexofthing2 ], "", heatcolor,  "black") );
            
        }
        mainsvgelem.appendChild( getsvglabel(hclustar[1][ indexofthing ], posx+rs+4, posy+(rs/2), 20) );
        
    }
    const posyaddfromheat = posy;
    posy += (yinc*2);
    //draw sorted result layer (every node is a cluster)
    for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){ //get last clusterlayer wich gives the over all sorting
        //dar dot and name
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        let nn = hclustar[1][ indexofthing ];//+" "+indexofthing.toString();
        //console.log(ci, nn, indexofthing);
        const c1 = cc[ci];
        
        lastpos.push([0,0]);
        lastweight.push(1);
        const c2 = getColorCode();
        posx =  (ci *xinc ) + offsetx + (rs/2); 
        mainsvgelem.appendChild( getrounddotlab( posx, posy, r, -90, "", c1, c2, linksss ) );     
    }
    //determin the layer connection width
    let mindi = Infinity;
    let maxdi = 0;
    for(let cl = 0; cl < hclustar[2].length; cl+=1){ //done use the first layer use the second layer and dont use the last one
        for(let ci = 0; ci < hclustar[2][cl].length; ci+=1){
            
            for(let cp = 0; cp < hclustar[2][cl][ci].length; cp += 1 ){
                if( hclustar[2][cl][ci][cp] < mindi ){
                    mindi = hclustar[2][cl][ci][cp];
                }
                if( hclustar[2][cl][ci][cp]> maxdi ){
                    maxdi = hclustar[2][cl][ci][cp];
                }
            }
            
        }
    }
    mindi += 1;
    maxdi += 1;
    //darw connections to join clusters
    const maxwidth = 20;
    let sw = (mindi * maxwidth) / maxdi;
    const swv = 5.0;
    console.log(mindi, maxdi, sw);
    for(let cl = 0; cl < hclustar[0].length; cl+=1){ //done use the first layer use the second layer and dont use the last one
        //console.log("Clusterlayer ", cl);
        let posy1 = ( (cl+1) * yinc )  +yinc+ posyaddfromheat;
        let posy2 = ( (cl+2) * yinc )  +yinc+(rs/2)+ posyaddfromheat;
        
        for(let ci = 0; ci < hclustar[0][cl].length; ci+=1){
            
            //draw a line from
            let firstindex = hclustar[0][cl][ci][0];
            
            let g = getindexofitemindistinctarray( hclustar[ 0 ][ ll ][0], firstindex );
            const c1 = cc[g];
            sw =  ((hclustar[2][cl][ci][ hclustar[2][cl][ci].length-1 ] * maxwidth) / maxdi ); //maybe as label????
            if(sw < 1){
                sw = sw * 10;
            }
            if(sw > maxwidth){
                sw = sw/10;
            }
            if(sw == 0){
                sw = 1;
            }
            //console.log("Cluster ", ci, sw );
            
            let posx = (g*xinc)+offsetx+(rs/2); 
            lastpos[g][0] = posx;
            lastpos[g][1] = posy2;
            lastweight[g] = sw;
            /*for(let i = 0; i < HCLU[0][cl][ci].length; i += 1){
                console.log("Name ", HCLU[1][HCLU[0][cl][ci][i]]);
            }*/
               
            mainsvgelem.appendChild( getstraitline( posx, posy1, posx, posy2, c1, swv ) );    
        }
    }

    //draw the horizontal line
    for(let g = 0; g < lastpos.length; g += 1){
        const c1 = cc[g];
        let x2 = lastpos[g][0];
        let y2 = lastpos[g][1];
        
        for(let ig = g; ig > -1; ig -= 1){
            //console.log("i- i y y- ", ig, g, y2, lastpos[ig][1]);
            if( lastpos[ig][1] > y2 ){
                x2 = lastpos[ig][0];
                y2 = lastpos[ig][1];
                sw = lastweight[ig]; //maxbe as label ???
                break;
            }
        }
        mainsvgelem.appendChild( getstraitline( 0, lastpos[g][1], tw, lastpos[g][1], "#d3d3d3", 1 ) );
        mainsvgelem.appendChild( getstraitline( lastpos[g][0], lastpos[g][1], x2, lastpos[g][1], c1, swv ) );  
    }
    return mainsvgelem;

} 

function drawhclustT( tw, th, scale, move, hclustar, linksss ){ //strong hierarchical
    const offsety = 100; //200;
    const offsetx = 20; //200;
    const r = 5;
    let tempth = hclustar[0][ hclustar[0].length-1 ][0].length*20;
    if(th < tempth){
        th = tempth;
    } 
    let mainsvgelem = getsvgMAINELEM( (tw+move+offsety).toString(), (th+move+offsetx).toString() );
    //console.log(hclustar);
    //this gives a regular grid for the points
    let xinc = Math.round( (tw - (offsety*2)) / hclustar[0].length );
    let yinc = Math.round( (th - (offsetx*2)) / hclustar[0][ hclustar[0].length-1 ][0].length );
    //console.log(xinc, yinc);
    let mindist = Infinity;
    let maxdist = 0;
    for(let l = 1; l < hclustar[ 2 ].length; l+=1 ){
        for(let ci = 0; ci < hclustar[ 2 ][ l ].length; ci+=1 ){
            if(hclustar[ 2 ][ l ][ci][0] > maxdist){
                maxdist = hclustar[ 2 ][ l ][ci][0];
            }
            if(hclustar[ 2 ][ l ][ci][0] < mindist){
                mindist = hclustar[ 2 ][ l ][ci][0];
            }
        }
    }
    let ll = hclustar[0].length-1;
    let cc = {};
    let posnode = {};
    //get the  position of each node
    for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){ //get last clusterlayer wich gives the over all sorting
        //dar dot and name
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        let nn = hclustar[1][ indexofthing ];//+" "+indexofthing.toString();
        //console.log(ci, nn, indexofthing);
        const c1 = getColorCode();
        for(let lll = 1; lll < hclustar[ 0 ].length; lll+=1){//go throgh the layers and find first join of the index of thing
            for(let ccii = 0; ccii < hclustar[ 0 ][lll].length; ccii += 1 ){//go through clustes
                if(hclustar[ 0 ][lll][ccii].indexOf( indexofthing ) != -1 && hclustar[ 2 ][lll][ccii][0] != 0){
                    const posy =  (ci * yinc ) + offsety;
                    const posx =  tw-(tw*(hclustar[ 2 ][ lll ][ ccii ][0]/maxdist));
                    posnode[ indexofthing.toString() ] = [posx,posy];
                    cc[ indexofthing.toString() ] = c1;
                    mainsvgelem.appendChild( getlabeledcircle( posx+offsetx, posy, r, nn, 1, c1, linksss ) );  
                    lll = hclustar[ 0 ].length;
                    break;
                }
            }
        }
           
    }
    //console.log(posnode);
    //draw sorted result layer (every node is a cluster) vertical on the most right position
    for(let l = 0; l < hclustar[ 0 ].length; l+=1 ){
        for(let ci = 0; ci < hclustar[ 0 ][ l ].length; ci += 1 ){
            if( hclustar[ 0 ][ l ][ ci ].length > 1 ){
                //console.log("join",hclustar[ 0 ][ l ][ ci ], "at",  hclustar[ 2 ][ l ][ ci ][0]);
                let xpos = Infinity;
                let xold = 0;
                let fromy = Infinity;
                let toy = 0;
                let c1 = 0;
                for(let pi = 0; pi < hclustar[ 0 ][ l ][ ci ].length; pi+=1 ){
                    
                    if(posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][0] < xpos){
                        xpos = posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][0];
                    }
                    if(posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][0] > xold){
                        xold = posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][0];
                    }
                    if(posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][1] < fromy){
                        fromy = posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][1];
                    }
                    if(posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][1] > toy){
                        toy = posnode[hclustar[ 0 ][ l ][ ci ][pi].toString()][1];
                    }
                    c1 = cc[hclustar[ 0 ][ l ][ ci ][pi].toString()];
                }
                
                let hy = Math.round((fromy+toy)/2);
                mainsvgelem.appendChild( getstraitline( xpos+offsetx, fromy, xpos, fromy, c1, 1.0 ) );
                mainsvgelem.appendChild( getstraitline( xpos+offsetx, toy, xpos, toy, c1, 1.0 ) ); 
                
                mainsvgelem.appendChild( getstraitline( xpos, fromy, xpos, toy, c1, 1.0 ) ); 
                //oben die verbindung zu einem
                mainsvgelem.appendChild( getstraitline( xpos, fromy, posnode[hclustar[ 0 ][ l ][ ci ][0].toString()][0], fromy, c1, 1.0 ) );
                //unten die horizontale verbindung
                mainsvgelem.appendChild( getstraitline( xpos, toy, posnode[hclustar[ 0 ][ l ][ ci ][hclustar[ 0 ][ l ][ ci ].length-1].toString()][0], toy, c1, 1.0 ) ); 
            }
        }
    }
   /* for(let ci = 0; ci < hclustar[ 0 ][ ll ][0].length; ci+=1 ){ //get last clusterlayer wich gives the over all sorting
        //dar dot and name
        let indexofthing = hclustar[ 0 ][ ll ][0][ ci ];
        let nn = hclustar[1][ indexofthing ];//+" "+indexofthing.toString();
        //console.log(ci, nn, indexofthing);
        const c1 = getColorCode();
        cc.push(c1);
        lastpos.push([0,0]);
        lastweight.push(1);
        const c2 = getColorCode();
        //getting the weights of the first join
        for(let lll = 1; lll < hclustar[ 0 ].length; lll+=1){//go throgh the layers and find first join of the index of thing
            for(let ccii = 0; ccii < hclustar[ 0 ][lll].length; ccii += 1 ){//go through clustes
                if(hclustar[ 0 ][lll][ccii].indexOf( indexofthing ) != -1 && hclustar[ 2 ][lll][ccii][0] != 0){
                    const posy =  (ci * yinc ) + offsety;
                    posx =  tw-(tw*hclustar[ 2 ][ lll ][ ccii ][0])+offsetx;
                    console.log(indexofthing, lll, ccii, posx, hclustar[ 2 ][ lll ][ ccii ][0], nn);
                    mainsvgelem.appendChild( getlabeledcircle( posx, posy, r, nn, 1, c1, linksss ) );  
                    const hy = (posy+yold)/2;
                    const fromx = min(xold, posx);
                    const from2x = max(xold, posx);
                    //const fromy = (lll * yinc ) + offsety;
                    if(xold != 0 && yold != 0){
                        mainsvgelem.appendChild( getstraitline( fromx, yold, from2x, yold, c1, 1.0 ) ); 
                        mainsvgelem.appendChild( getstraitline( fromx, yold, fromx, posy, c1, 1.0 ) ); 
                    } else {
                        mainsvgelem.appendChild( getstraitline( fromx, posy, from2x, posy, c1, 1.0 ) );    
                    }
                    //mainsvgelem.appendChild( getstraitline( xold, yold, xold, hy, c1, 1.0 ) ); 
                    //mainsvgelem.appendChild( getstraitline( xold, hy, posx, posy, c1, 1.0 ) ); 
                    //mainsvgelem.appendChild( getstraitline( xold, hy, posx, hy, c1, 1.0 ) ); 
                    
                    lll = hclustar[ 0 ].length;
                    xold = posx;
                    yold = posy;
                    break;
                }
            }
        }
           
    }*/
    //determin the layer connection width
    /*let mindi = Infinity;
    let maxdi = 0;
    for(let cl = 0; cl < hclustar[2].length; cl+=1){ //done use the first layer use the second layer and dont use the last one
        for(let ci = 0; ci < hclustar[2][cl].length; ci+=1){
            
            for(let cp = 0; cp < hclustar[2][cl][ci].length; cp += 1 ){
                if( hclustar[2][cl][ci][cp] < mindi ){
                    mindi = hclustar[2][cl][ci][cp];
                }
                if( hclustar[2][cl][ci][cp]> maxdi ){
                    maxdi = hclustar[2][cl][ci][cp];
                }
            }
            
        }
    }
    mindi += 1;
    maxdi += 1;
    //darw connections to join clusters
    const maxwidth = 20;
    let sw = (mindi * maxwidth) / maxdi;
    const swv = 5.0;
    console.log(mindi, maxdi, sw);
    for(let cl = 0; cl < hclustar[0].length; cl+=1){ //done use the first layer use the second layer and dont use the last one
        //console.log("Clusterlayer ", cl);
        let posy1 = ( (cl+1) * yinc ) + offsety + move;
        let posy2 = ( (cl+2) * yinc ) + offsety + move;
        
        for(let ci = 0; ci < hclustar[0][cl].length; ci+=1){
            
            //draw a line from
            let firstindex = hclustar[0][cl][ci][0];
            
            let g = getindexofitemindistinctarray( hclustar[ 0 ][ ll ][0], firstindex );
            const c1 = cc[g];
            sw =  ((hclustar[2][cl][ci][ hclustar[2][cl][ci].length-1 ] * maxwidth) / maxdi ); //maybe as label????
            if(sw < 1){
                sw = sw * 10;
            }
            if(sw > maxwidth){
                sw = sw/10;
            }
            if(sw == 0){
                sw = 1;
            }
            //console.log("Cluster ", ci, sw );
            
            let posx = (g*xinc)+offsetx; 
            lastpos[g][0] = posx;
            lastpos[g][1] = posy2;
            lastweight[g] = sw;
            //for(let i = 0; i < HCLU[0][cl][ci].length; i += 1){
            //    console.log("Name ", HCLU[1][HCLU[0][cl][ci][i]]);
            //}
               
            mainsvgelem.appendChild( getstraitline( posx, posy1, posx, posy2, c1, swv ) );    
        }
    }

    //draw the horizontal line
    for(let g = 0; g < lastpos.length; g += 1){
        const c1 = cc[g];
        let x2 = lastpos[g][0];
        let y2 = lastpos[g][1];
        
        for(let ig = g; ig > -1; ig -= 1){
            //console.log("i- i y y- ", ig, g, y2, lastpos[ig][1]);
            if( lastpos[ig][1] > y2 ){
                x2 = lastpos[ig][0];
                y2 = lastpos[ig][1];
                sw = lastweight[ig]; //maxbe as label ???
                break;
            }
        }
        mainsvgelem.appendChild( getstraitline( 0, lastpos[g][1], tw, lastpos[g][1], "#d3d3d3", 1 ) );
        mainsvgelem.appendChild( getstraitline( lastpos[g][0], lastpos[g][1], x2, lastpos[g][1], c1, swv ) );  
    }
    */
    return mainsvgelem;
}

/*special drawing fkt / Testing*/
function e(){
    let drawarea = document.getElementById("vivi");
    drawarea.width = "2000";
    drawarea.height= "2000";
    let ctx = drawarea.getContext( '2d' );
    let addx = Math.round(drawarea.width/2);
    let addy = Math.round(drawarea.height/2);
    console.log("ADD: ", addx, addy );
    ctx.font = "10px Arial";
    
    let mainsvgelem = getsvgMAINELEM( "2000", "2000" );
    for( let i = 0; i < resuof["points"].length; i += 1) {
        let nn = resuof["names"][i].replace(".obj", "");
        let nl = "https://archaeologydataservice.ac.uk/archives/view/archaide_2019/downloads_amphora.cfm?amph="+nn;
        let posx = Math.round( (resuof["points"][i][0]*1)+addx );
        let posy = Math.round( (resuof["points"][i][1]*1)+addy );
        //posx = (posx*Math.log(posx)) / 5;
        //posy = (posy*Math.log(posy)) / 5;
        if(posx > drawarea.width || posy > drawarea.height ){
            console.log(nn, "at", posx, posy );
        }
        //ctx.beginPath();
        //ctx.fillStyle = "black";
        //ctx.fillText(nn, posx+5, posy+5); 
        //ctx.fillStyle = "red";
        //ctx.rect(posx, posy, 5, 5);
        //ctx.fill();

        //svg
        mainsvgelem.appendChild( getdot( posx, posy, 6, nn, nl,"red", "blue" ) );
    }
    document.getElementById("otherthan").appendChild( mainsvgelem );
}

/*--------------------Polardiagramm-------------------------------------------*/
const windstep = 2; //tws in plot
const drawdiscircles = 100; //px or what, per windstep tws in plot
const offsetpolar = 70;
const drawnbs = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
//function drawtwslines( tws, twa, boatspeed, svgid ){
function drawtwslines( tws, twa, twslines, svgid, todel ){
    let mainsvgelem = document.getElementById( svgid );
    if(todel != ""){
        const ee = document.querySelectorAll("."+todel);
        for (var i = 0; i < ee.length; i++) {
            ee[i].parentNode.removeChild(ee[i]);
        }
    }
    let gelem = getsvgpath( todel );
    
    //console.log(svgid, mainsvgelem);
    const radiusper1kn = drawdiscircles/windstep;
    const centerx = Math.round( (mainsvgelem.clientWidth)/2 );
    const centery = Math.round( (mainsvgelem.clientHeight)/2 );
    console.log("SCG center: ", centerx, centery);
    //sort the tws lines
    /*let twslines = [];
    for(let w = 0; w < tws.length; w+=1 ){
        twslines.push([]);
    }
    for( let w = 0; w < tws.length; w+=1 ){
        for( let d = 0; d < twa.length; d+=1 ){
            twslines[w].push( boatspeed[ d ][ w ] );
        }
    }*/
    //console.log(twslines);
    const ccdd = getColorCode();
    for( let l = 0; l < twslines.length; l+=1 ){
        const truewsvalue = tws[l];
        //one color for one line
        
        //console.log("True windspeed line: ", truewsvalue, ccdd);
        let oldx = null;
        let oldy = null;
        for( let a = 0; a < twa.length; a += 1 ){
            const truewavalue = parseFloat( twa[a] );
            if(twslines[l][a] == -1){
                continue;
            }
            const bsatpoint = twslines[l][a]*radiusper1kn; //boatspeed radius is the knots value multiplied with the size step per knot
        
            const angle = truewavalue * ( Math.PI / 180 ); // Convert from Degrees to Radians
            const drawx = centerx + bsatpoint * Math.sin(angle);
            const drawy = centery + bsatpoint * Math.cos(angle);
            gelem.appendChild( getrounddotlab( drawx, drawy, 3, -90, twslines[l][a], ccdd, ccdd, "" ) );
            if(oldx != null){
                gelem.appendChild( getstraitline( oldx, oldy, drawx, drawy, ccdd, 1 ) );
            } else {
                console.log(truewsvalue);
                let twslabel = getsvglabel( truewsvalue, drawx, drawy+15, 0);
                twslabel.setAttribute( "stroke", ccdd );
                gelem.appendChild( twslabel );
            }
            oldx = drawx;
            oldy = drawy;
        }
    }   
    mainsvgelem.appendChild( gelem ); 
}

function pointpos( e, idsel, pc ){
    //console.log(e);
    const twsI = parseInt( document.getElementById( idsel ).value );
    const radiu = euclideanM(pc, [e.layerX,e.layerY]);
    const bsval = Math.round( ((radiu/drawdiscircles)*2)*10 ) / 10;
    const twaval = Math.round( (Math.acos((e.layerY-pc[1])/radiu)*(180/Math.PI))*10 ) / 10;
    for( let t = 0; t < drawnbs.length; t += 1 ){
        if(t != twsI && drawnbs[t][twaval] == undefined ){
            drawnbs[t][twaval] = -1.0; //there is a value bs of true wind angle for for every tws ... 
        }
    }
    drawnbs[twsI][parseFloat(twaval).toString()] = bsval;
    //console.log( drawnbs );
    let twsret = [];
    let twaret = Object.keys( drawnbs[twsI] );
    for(let t = 0; t < twaret.length; t += 1){
        twaret[t] = parseFloat(twaret[t]);
    }
    twaret.sort( function (a, b) {
        return a - b;
    });
    //console.log(twaret);
    
    let bsret = [];
    
    for( let t = 0; t < drawnbs.length; t += 1 ){
        if(len(drawnbs[t]) != 0){
            twsret.push( t );
            let temp = [];
            for( let k = 0; k < twaret.length; k+=1 ){temp.push(drawnbs[t][twaret[k]]);}
            bsret.push( temp );
        }
    }

    
    
    drawtwslines( twsret, twaret, bsret, polarname );
}

function updateposlabel( e, idst, idsel, pc ){
    //console.log(e, idst);
    const radiu = euclideanM(pc, [e.layerX,e.layerY]);
    const bsval = Math.round( ((radiu/drawdiscircles)*2)*10 ) / 10;
    const twaval = Math.round( (Math.acos((e.layerY-pc[1])/radiu)*(180/Math.PI))*1 ) / 1;
    
    
    document.getElementById( idst ).innerHTML = "TWA: "+twaval+", TWS: "+ document.getElementById( idsel ).value.toString() +" kn, BS: "+bsval+" ";
}

function getpolar( tw, th, svgid ){
    const compW = (tw+offsetpolar).toString();
    const compH = (th+offsetpolar).toString();
    let container2 = document.createElement( "div" );
    let container = document.createElement( "div" );
    container.setAttribute( "id", svgid+"container" );
    container.setAttribute( "id", svgid+"container" );
    container.style.width = compW+"px";
    container.style.height = compH+"px";
    //container.style.position = "relative";

    const radiu = Math.round( tw/2 );
    
    let mainsvgelem = getsvgMAINELEM( compW, compH );
    mainsvgelem.setAttribute( "id", svgid );
    mainsvgelem.style.position = "absolute";
    
    const centerx = Math.round( (tw+offsetpolar)/2 );
    const centery = Math.round( (th+offsetpolar)/2 );

    
    
    const howmanycircles = Math.round((tw/2)/(drawdiscircles) );
    const angelstep = 10;
     
    console.log( "How many circles: ", howmanycircles );

    // put lines in anglestep from 0 degree 
    for( let i = 0; i < 360; i+= angelstep){
        //prepare values
        const angle = i * ( Math.PI / 180 ); // Convert from Degrees to Radians
        const drawx2 = centerx + radiu * Math.sin(angle);
        const drawy2 = centery + radiu * Math.cos(angle);
        //darw line
        mainsvgelem.appendChild( getstraitlinelabelatend( centerx, centery, drawx2, drawy2, "red", 1, i.toString()+"°", "-90" ) );
    }
    //put circles at windstep from center
    for(let i = 1; i < howmanycircles; i += 1 ){
        mainsvgelem.appendChild( getlabeledcircle( centerx, centery, ((i*drawdiscircles)), (i*windstep), 2, "black", "" ) );

    }

    let can = document.createElement( "canvas" );
    can.setAttribute( "id", svgid+"canvas" );
    can.onclick = function(e){ pointpos(e, "idotwssel", [centerx, centery] ); };
    can.onmousemove = function(e){ updateposlabel( e, "idofla", "idotwssel", [centerx, centery] ); };
    can.style.position = "absolute";
    can.style.width = compW+"px";
    can.style.height = compH+"px";
    //can.style.border = "2px solid red";
    
    let laspan = document.createElement( "span" );
    laspan.setAttribute( "id", "idofla" );

    let seltws = document.createElement( "select" );
    seltws.setAttribute( "id", "idotwssel" );
    let o1 = document.createElement("option");
        o1.text = "TWS 1 kn";
        o1.value = 1;
    seltws.appendChild( o1 );
    let o2 = document.createElement("option");
        o2.text = "TWS 2 kn";
        o2.value = 2;
    seltws.appendChild( o2 );
    let o3 = document.createElement("option");
        o3.text = "TWS 3 kn";
        o3.value = 3;
    seltws.appendChild( o3 );
    let o4 = document.createElement("option");
        o4.text = "TWS 4 kn";
        o4.value = 4;
    seltws.appendChild( o4 );
    let o5 = document.createElement("option");
        o5.text = "TWS 5 kn";
        o5.value = 5;
    seltws.appendChild( o5 );
    let o6 = document.createElement("option");
        o6.text = "TWS 6 kn";
        o6.value = 6;
    seltws.appendChild( o6 );
let o7 = document.createElement("option");
        o7.text = "TWS 7 kn";
        o7.value = 7;
    seltws.appendChild( o7 );
    let o8 = document.createElement("option");
        o8.text = "TWS 8 kn";
        o8.value = 8;
    seltws.appendChild( o8 );
    let o9 = document.createElement("option");
        o9.text = "TWS 9 kn";
        o9.value = 9;
    seltws.appendChild( o9 );
    let o10 = document.createElement("option");
        o10.text = "TWS 10 kn";
        o10.value = 10;
    seltws.appendChild( o10 );
    let o11 = document.createElement("option");
        o11.text = "TWS 11 kn";
        o11.value = 11;
    seltws.appendChild( o11 );
    let o12 = document.createElement("option");
        o12.text = "TWS 12 kn";
        o12.value = 12;
    seltws.appendChild( o12 );
    let o13 = document.createElement("option");
        o13.text = "TWS 13 kn";
        o13.value = 13;
    seltws.appendChild( o13 );
    let o14 = document.createElement("option");
        o14.text = "TWS 14 kn";
        o14.value = 14;
    seltws.appendChild( o14 );
    let o15 = document.createElement("option");
        o15.text = "TWS 15 kn";
        o15.value = 15;
    seltws.appendChild( o15 );
    //return mainsvgelem;
    container.appendChild(mainsvgelem);
    container.appendChild(can);
    
    container2.appendChild(container);
    
    container2.appendChild(seltws);
    container2.appendChild(laspan);
    return container2;
}

/*-------------------- Draw SGKNN --------------------------------------------*/
const doani = false; //show anaimation of svg elem?
//colo scheme for animation
const offset = 30; //posx muss offset werden 
const colorofkoor = "black";
const coloroflinsim = "red";
const colorofsum = "gray";
const colorofdata = "blue";
const colorofinp = "lightblue";

function getalayerofzwischen( input, inpx, compudedy, numout, sw, sh, allheight, widthofthem ){ //inpy and compudedy is the results of a layer or the wohle network
    //kasten
    let allnode = document.createElementNS( xmlns, "g" );
    allnode.setAttribute( "width", sw.toString()+"px" );
    allnode.setAttribute( "height", allheight.toString()+"px" );

    //schrift 
    const kasten = getstraitlinelabelatend( sw, allheight/2, 0, allheight/2, colorofdata, allheight,  "  ", "0");
    allnode.appendChild( kasten );
    //Verbindung    
    for( let o = 1; o < numout+1; o += 1 ){
        const verbi = getstraitlinelabelatend( o*widthofthem, allheight, o*widthofthem, (allheight+allheight)+(allheight/2), colorofdata, 2,  ">>>", "180");
        allnode.appendChild( verbi );
    }

    
    const colorofbalk = "white";
    

    //diagramm of wohle node
    if(compudedy.length != 0){
        //console.log(inpx,compudedy);
        const center = {"x": sw/2, "y": ((allheight-sh)/2)};
        const ay2 = getstraitlinelabelatend( center["x"], center["y"]*2, center["x"], 0,  colorofkoor, 2,  "y", "0");
        const ax2 = getstraitlinelabelatend( 0, center["y"], center["x"]*2, center["y"], colorofkoor, 2, "x", "0" );
        let koordsys2 = document.createElementNS( xmlns, "g" );
        koordsys2.appendChild( ay2 );
        koordsys2.appendChild( ax2 );
        allnode.appendChild(koordsys2);
        let skf = 1;
        for( let XX = 0; XX < input.length; XX += 1){
            if(input[XX] < 10){
                skf = 10;
            } else if( input[XX] < 1){    
                skf = 100;
            } else if( input[XX] < 0.01){    
                skf = 1000;
            }
            
        }
        for( let f = 0; f < compudedy.length; f += 1 ){
            koordsys2.appendChild( getdot( center["x"]+(inpx[f]*skf), center["y"]-(compudedy[f]*skf), 2, inpx[f].toString()+"/"+compudedy[f], "", colorofbalk, colorofbalk ) );
        }
    } else {
        //diagramm of input per rang
        let labya = "Val";
        let labxa = "Inp";

        const ay = getstraitlinelabelatend( 10, sh, 10, allheight-sh, colorofkoor, 2,  labya, "0");
        const ax = getstraitlinelabelatend( 10, sh, allheight-10, sh, colorofkoor, 2, labxa, "0" );
        let koordsys = document.createElementNS( xmlns, "g" );
        //balken im diagramm
        let skf = 1;
        for( let XX = 0; XX < input.length; XX += 1){
            if(input[XX] < 10){
                skf = 10;
            } else if( input[XX] < 1){    
                skf = 100;
            } else if( input[XX] < 0.01){    
                skf = 1000;
            }
            
        }
        const breitebalk = (allheight-sh)/input.length;
        //console.log(input);
        for( let r = 0; r < input.length; r += 1 ){
            const verbi = getstraitlinelabelatend( (r*breitebalk)+(breitebalk/2)+10, sh, (r*breitebalk)+(breitebalk/2)+10, (input[r]*skf)+sh, colorofbalk, breitebalk-2,  dreistellen(input[r]), "0");
            koordsys.appendChild( verbi );
        }
        koordsys.appendChild( ay );
        koordsys.appendChild( ax );
        allnode.appendChild( koordsys );

    }
    return allnode;
}



function getalayerofin( input, numout, sw, sh, allheight, widthofthem ){ 
    //console.log("deb 2u ")
    //kasten
    let allnode = document.createElementNS( xmlns, "g" );
    allnode.setAttribute( "width", sw.toString()+"px" );
    allnode.setAttribute( "height", allheight.toString()+"px" );

    //schrift 
    const kasten = getstraitlinelabelatend( sw, sh/2, 0, sh/2, colorofinp, sh,  "  INPUT: "+ input.toString(), "0");
    allnode.appendChild( kasten );
    //Verbindung    
    for( let o = 1; o < numout+1; o += 1 ){
        const verbi = getstraitlinelabelatend( o*widthofthem, sh, o*widthofthem, allheight+(allheight/2), colorofinp, 2,  ">>>", "180");
        allnode.appendChild( verbi );
    }

    return allnode;
}
function getnodeofsgknn( ldop, loffx, loffy, lokw, lokh, inpdata, weights, bias, outsize, outnum, unknownX, unknowY ){
    //console.log("debu");
    let addlin = [];
    for( let t = 0; t < weights.length; t += 1 ){
        addlin.push(0);
    }

    let allnode = document.createElementNS( xmlns, "g" );
    allnode.setAttribute( "width", (lokw*2).toString()+"px" );
    allnode.setAttribute( "height", (lokh*2).toString()+"px" );
    //console.log(weights, inpdata, addlin, ldop, loffx, loffy, lokw, lokh);
    let Inparea = getlinfktfull( weights, inpdata, addlin, ldop, loffx, loffy, lokw, lokh );
    //console.log("debu+++");
    allnode.appendChild( Inparea );
    Inparea.setAttribute( 'transform', 'translate('+lokw+', 0)' );
    let Linfarea = getsaeudiaginp( inpdata, ldop, loffx, loffy, lokw, lokh );
    allnode.appendChild( Linfarea );
    Linfarea.setAttribute( 'transform', 'translate('+lokw+', '+lokh+')' );
    let zwischenerg = [];
    let sum = 0;
    for(let z = 0; z < inpdata.length; z += 1){
        //console.log(inpdata[z]*weights[z]);
         zwischenerg.push(inpdata[z]*weights[z]);
        sum += inpdata[z]*weights[z];
    }
    let Actiarea = getsumbiasaktiv( zwischenerg, bias, ldop, loffx, loffy, lokw, lokh );
    allnode.appendChild( Actiarea );
    Actiarea.setAttribute( 'transform', 'translate( 0 , 0)' );
    //console.log("debu---");
    let Outparea = getoutputofnode( sum, bias, ldop, loffx, loffy, lokw, lokh, unknownX, unknowY );
    allnode.appendChild( Outparea );
    Outparea.setAttribute( 'transform', 'translate( 0, '+lokh+')' );
    
    return allnode;
}


function dreistellen( z ){
    return Math.floor(z*1000.0)/1000.0;
}

function getlinfktfull( a, x, b, dop, posx, posy, w, h ){ //a x + b
    //console.log(a, x, b, dop, posx, posy, w, h);
    let drawingall = document.createElementNS( xmlns, "g" );
    drawingall.setAttributeNS(null, "width", w.toString()+"px" );
    drawingall.setAttributeNS(null, "height", h.toString()+"px" );
    let labxa = "x";
    let labya = "y";
    
    if( dop != 2 ){
        labxa = "";
        labya = "";
    } 
    //koor sys
    const center = {"x": posx, "y": (h-posy)/2};
    const ay = getstraitlinelabelatend( posx, h-posy, posx, posy, colorofkoor, 2,  labya, "0");
    const ax = getstraitlinelabelatend( center["x"], center["y"], w-offset, center["y"], colorofkoor, 2, labxa, "0" );
    let koordsys = document.createElementNS( xmlns, "g" );
    koordsys.appendChild( ay );
    koordsys.appendChild( ax );

    drawingall.appendChild( koordsys );
    let skf = 1;
    for( let XX = 0; XX < x.length; XX += 1){
        if(x[XX] < 10){
            skf = 10;
        } else if( x[XX] < 1){    
            skf = 100;
        } else if( x[XX] < 0.01){    
            skf = 1000;
        }
        
    }

    //fkt graph
    for( let XX = 0; XX < x.length; XX += 1){
        let labgra = dreistellen(a[XX]).toString()+" * z + "+ dreistellen(b[XX]).toString();
        //console.log(x[XX], "e: ", (a[XX]*x[XX])+b[XX]);
        if(b[XX] == 0){
            labgra = dreistellen(a[XX]).toString()+" * z";
        }
        let labx = dreistellen(x[XX]).toString();
        let laby = dreistellen((a[XX]*x[XX])+b[XX]).toString();
        if(dop == 0){
            labgra = "";
            labx = "";
            laby = "";
        }
        

        let graph = getstraitlinelabelatend( center["x"], center["y"]-b[XX], center["x"]+(x[XX]*skf*1.5) , (center["y"] - ((a[XX]*(x[XX]*skf*1.5))+b[XX])), coloroflinsim, 2, labgra, "0" );
        
        //input - die blaue linie scheint noch nicht zu stimmen  
        
        let inpu = getstraitlinelabelatend( center["x"]+(x[XX]*skf), (center["y"] - ((a[XX]*(x[XX]*skf))+b[XX])), offset+x[XX]*skf, h, colorofdata, 1, labx, "0" );
        inpu.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
        if( doani ){
            let aniI = document.createElementNS( xmlns, "animate" );
            aniI.setAttributeNS( null, "attributeName", "stroke-dasharray" );
            aniI.setAttributeNS( null, "values", "5 5; 3 3; 1 1; " );
            aniI.setAttributeNS( null, "dur", "2s" );
            aniI.setAttributeNS( null, "repeatCount", "indefinite" );
            inpu.appendChild( aniI );  
        }
        //output
        let outpu = getstraitlinelabelatend( center["x"]+(x[XX]*skf), (center["y"] - ((a[XX]*(x[XX]*skf))+b[XX])), 0, (center["y"] - ((a[XX]*(x[XX]*skf))+b[XX])), colorofdata, 1, laby, "0" );
        outpu.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
        if( doani ){
            let aniO = document.createElementNS( xmlns, "animate" );
            aniO.setAttributeNS( null, "attributeName", "stroke-dasharray" );
            aniO.setAttributeNS( null, "values", "1 1; 2 2; 4 4;" );
            aniO.setAttributeNS( null, "dur", "2s" );
            aniO.setAttributeNS( null, "repeatCount", "indefinite" );
            outpu.appendChild( aniO );  
        }
    
        drawingall.appendChild( graph );
        drawingall.appendChild( inpu );
        drawingall.appendChild( outpu );
    }
    
    return drawingall;
}


function getsaeudiaginp( inp, ldop, loffx, loffy, w, h ){ //aktivation fkt, übertragungscharcteristik
    
    let drawingall = document.createElementNS( xmlns, "g" );
    drawingall.setAttributeNS(null, "width", w.toString()+"px" );
    drawingall.setAttributeNS(null, "height", h.toString()+"px" );
    let labya = "Val";
    let labxa = "Inp";
    if( ldop != 2 ){
        labxa = "";
        labya = "";
    } 
    //koor sys
    const ay = getstraitlinelabelatend( loffx, loffy, loffx, h-loffy, colorofkoor, 2,  labya, "0");
    const ax = getstraitlinelabelatend( loffx, loffy, w-loffx, loffy, colorofkoor, 2, labxa, "0" );
    let koordsys = document.createElementNS( xmlns, "g" );
    koordsys.appendChild( ay );
    koordsys.appendChild( ax );

    let sizeofbalk = Math.round((w-(2*loffx) / inp.length) /6);
    let skf = 1;
    for( let XX = 0; XX < inp.length; XX += 1){
        if(inp[XX] < 10){
            skf = 10;
        } else if( inp[XX] < 1){    
            skf = 100;
        } else if( inp[ XX ] < 0.01){
            skf = 1000;
        }
    }
    for( let XX = 0; XX < inp.length; XX += 1){
    //balken and verbindung zum Rand
        drawingall.appendChild( getstraitlinelabelatend( loffx+(XX*sizeofbalk)+sizeofbalk/2, loffy, loffx+(XX*sizeofbalk)+sizeofbalk/2, loffy+(inp[XX]*skf), colorofinp, sizeofbalk, dreistellen(inp[XX]).toString(), "0" ) );
        let con = getstraitlinelabelatend( loffx+(XX*sizeofbalk)+sizeofbalk/2, loffy, loffx+(inp[XX]*skf), 0, colorofdata, 1, "", "0" );
        con.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
        if( doani ){
            let aniI = document.createElementNS( xmlns, "animate" );
            aniI.setAttributeNS( null, "attributeName", "stroke-dasharray" );
            aniI.setAttributeNS( null, "values", "1 1; 3 3; 5 5; " );
            aniI.setAttributeNS( null, "dur", "2s" );
            aniI.setAttributeNS( null, "repeatCount", "indefinite" );
            con.appendChild( aniI );  
        }
        drawingall.appendChild( con );
    }

    drawingall.appendChild( koordsys );
    return drawingall;
}

function getsumbiasaktiv( zwida, bias, ldop, loffx, loffy, w, h ){
    let skf = 1;
    const colorofkoor = "black";
    const coloroflinsim = "red";
    const colorofsum = "gray";
    const colorofdata = "blue";
    const colorofbias = "green";
    let drawingall = document.createElementNS( xmlns, "g" );
    drawingall.setAttributeNS(null, "width", w.toString()+"px" );
    drawingall.setAttributeNS(null, "height", h.toString()+"px" );
    const center = {"x": w-(loffx*2), "y": (h-loffy)/2};
    let sum = 0;
    for( let z = 0; z < zwida.length; z += 1 ){
        if(zwida[ z ] < 10){ //adjust scale factor
            skf = 10;
        } else if( zwida[ z ] < 1){
            skf = 100;
        } else if( zwida[ z ] < 0.01){
            skf = 1000;
        }
        sum += zwida[ z ];
    }
    
    //sum
    drawingall.appendChild( 
        getstraitlinelabelatend( w-(loffx/2), h-loffy, w-(loffx/2), loffy, colorofsum, loffx, "S: "+dreistellen(sum).toString(), "90" ) );
    drawingall.appendChild( 
        getstraitlinelabelatend( w, center["y"], w-loffx, center["y"], colorofkoor, 2, "", "0" ) );

    //addd the scale factor
    sum *= skf;
    let con1 = getstraitlinelabelatend( w-loffx, center["y"]-sum, w, center["y"]-sum, colorofdata, 2, "", "0" );
    con1.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
    if( doani ){
        let aniI = document.createElementNS( xmlns, "animate" );
        aniI.setAttributeNS( null, "attributeName", "stroke-dasharray" );
        aniI.setAttributeNS( null, "values", "5 5; 3 3; 1 1; " );
        aniI.setAttributeNS( null, "dur", "2s" );
        aniI.setAttributeNS( null, "repeatCount", "indefinite" );
        con1.appendChild( aniI ); 
    } 
    drawingall.appendChild( con1 );

    //add
    let sumbias = sum+bias*skf;
    drawingall.appendChild( 
        getstraitlinelabelatend( w-(loffx/2)-loffx, h-loffy, w-(loffx/2)-loffx, loffy, colorofbias, loffx, "+"+dreistellen(bias).toString(), "90" ) );
    drawingall.appendChild( 
        getstraitlinelabelatend( w-loffx, center["y"], w-(loffx*2), center["y"], colorofkoor, 2, "", "0" ) );

    let con2 = getstraitlinelabelatend( w-(loffx*2), center["y"]-(sumbias), w-loffx, center["y"]-(sumbias), colorofdata, 2, "", "0" );
    con2.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
    if( doani ){
        let anin = document.createElementNS( xmlns, "animate" );
        anin.setAttributeNS( null, "attributeName", "stroke-dasharray" );
        anin.setAttributeNS( null, "values", "5 5; 3 3; 1 1; " );
        anin.setAttributeNS( null, "dur", "2s" );
        anin.setAttributeNS( null, "repeatCount", "indefinite" );
        con2.appendChild( anin );  
    }
    drawingall.appendChild( con2 );

    //koordinat for relu
    drawingall.appendChild( 
        getstraitlinelabelatend( w-(loffx*2), h-loffy, w-(loffx*2), loffy, colorofkoor, 2, "", "90" ) );
    drawingall.appendChild( 
        getstraitlinelabelatend( w-(loffx*2), center["y"], loffx, center["y"], colorofkoor, 2, "relu", "-90" ) );
    //relu graph
    if( sumbias > 0){
        drawingall.appendChild( 
        getstraitlinelabelatend( center["x"], center["y"], center["x"]-((sumbias+10)*1.5), center["y"]-((sumbias+10)*1.5), coloroflinsim, 2, "", "-90" ) );
    }
    //relu data
    let con3 = getstraitlinelabelatend( w-(loffx*2), center["y"]-(sumbias), w-((loffx*2)+sumbias), center["y"]-(sumbias), colorofdata, 2, "", "0" );
    con3.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
    if( doani ){
        let anid = document.createElementNS( xmlns, "animate" );
        anid.setAttributeNS( null, "attributeName", "stroke-dasharray" );
        anid.setAttributeNS( null, "values", "1 1; 3 3; 5 5; " );
        anid.setAttributeNS( null, "dur", "2s" );
        anid.setAttributeNS( null, "repeatCount", "indefinite" );
        con3.appendChild( anid );  
    }
    drawingall.appendChild( con3 );
    let con4 = getstraitlinelabelatend( center["x"]-(sumbias), center["y"]-(sumbias), center["x"]-(sumbias), h, colorofdata, 2, "", "0" );
    con4.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
    if( doani ){
        let anic = document.createElementNS( xmlns, "animate" );
        anic.setAttributeNS( null, "attributeName", "stroke-dasharray" );
        anic.setAttributeNS( null, "values", "1 1; 3 3; 5 5; " );
        anic.setAttributeNS( null, "dur", "2s" );
        anic.setAttributeNS( null, "repeatCount", "indefinite" );
        con4.appendChild( anic ); 
    } 
    drawingall.appendChild( con4 );
    return drawingall;
}

function getoutputofnode( su, bia, ldop, loffx, loffy, w, h, unknownX, unknownY ){
    const colorofdata = "blue";
    const colorofbias = "green";
    const colorofkoor = "black";
    let drawingall = document.createElementNS( xmlns, "g" );
    drawingall.setAttributeNS(null, "width", w.toString()+"px" );
    drawingall.setAttributeNS(null, "height", h.toString()+"px" );
    const subia = relulu( su+bia );
    let skf = 1;
    if(subia < 10){
        skf = 10;
    } else if( subia < 1){
        skf = 100;
    } else if( subia < 0.01){
        skf = 1000;
    }

    //draw unknown data
    const center = {"x": (w-((loffx*2)+(subia*skf)))/2, "y": (h-loffy)/2};
    const ax = getstraitlinelabelatend( center["x"], h-loffy, center["x"], loffy, colorofkoor, 2,  "x", "0");
    const ay = getstraitlinelabelatend( center["x"]*2, center["y"], loffx, center["y"], colorofkoor, 2, "y", "0" );
    let koordsys = document.createElementNS( xmlns, "g" );
    koordsys.appendChild( ay );
    koordsys.appendChild( ax );
    
    for( let f = 0; f < unknownX.length; f += 1 ){
        koordsys.appendChild( getdot( center["x"]-(unknownY[f]*skf), center["y"]-(unknownX[f]*skf), 2, unknownX[f].toString()+"/"+unknownY[f], "", colorofkoor, colorofkoor ) );
    }

    //output
    let con4 = getstraitlinelabelatend( w-((loffx*2)+(subia*skf)), 0, w-((loffx*2)+(subia*skf)), h, colorofdata, 2, dreistellen(subia).toString(), "0" );
    con4.setAttributeNS(null, "stroke-dasharray", "1.99 1.99" );
    if( doani ){
        let anic = document.createElementNS( xmlns, "animate" );
        anic.setAttributeNS( null, "attributeName", "stroke-dasharray" );
        anic.setAttributeNS( null, "values", "1 1; 3 3; 5 5; " );
        anic.setAttributeNS( null, "dur", "2s" );
        anic.setAttributeNS( null, "repeatCount", "indefinite" );
        con4.appendChild( anic );  
    }

    drawingall.appendChild( koordsys );
    drawingall.appendChild( con4 );

    return drawingall;
}


/*------------------DOWNLOADING SVG TO FILE-----------------------------------*/
function downsvg( elem, name ) {
  const base64dec = btoa(unescape(encodeURIComponent(elem.outerHTML)));
  const a = document.createElement('a');
  const e = new MouseEvent('click');

  a.download = name+".svg";
  a.href = 'data:text/html;base64,' + base64dec;
  a.dispatchEvent(e);
}
function downsvgfromelem( elem, name ) {
  const base64dec = btoa(unescape(encodeURIComponent(elem.innerHTML)));
  const a = document.createElement('a');
  const e = new MouseEvent('click');

  a.download = name+".svg";
  a.href = 'data:text/html;base64,' + base64dec;
  a.dispatchEvent(e);
}

