import React from 'react'
import Link from 'next/link'

export default function Logo()
{
    return (
        <Link href="/" className='logo__litter'>
            <div>
                Moz
            </div>
            <span>sm</span>
        </Link>
    )
}