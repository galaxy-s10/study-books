/**
 * tip：files
 * If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. When a 'files' property is specified, only those files and those specified by 'include' are included.
 * 如果tsconfig中没有'files'或'include'属性。Json，编译器默认包含包含目录和子目录中的所有文件，
 * 除了那些由'exclude'指定的文件。当指定了'files'属性时，只包含那些文件和由'include'指定的文件。
 * 个人理解：如果设置了files属性，就会编译files属性的文件以及include指定的文件，
 * 如果没有设置files或者include，就会编译所有文件，但不编译exclude指定的文件
 */

/**
 * tip：include
 * Specifies a list of glob patterns that match files to be included in compilation. If no 'files' or 'include' property is present in a tsconfig.json, the compiler defaults to including all files in the containing directory and subdirectories except those specified by 'exclude'. Requires TypeScript version 2.0 or later.
 * 指定匹配要包含在编译中的文件的glob模式列表。如果tsconfig.json中没有'files'或'include'属性。
 * 编译器默认包含包含目录和子目录中的所有文件，除了那些由'exclude'指定的文件。需要TypeScript 2.0或更高版本。
 * 个人理解：include即包含，即把要编译的文件写在include里，但不会包含exclude的文件
 */

/**
 * tip：exclude
 * Specifies a list of files to be excluded from compilation. The 'exclude' property only affects the files included via the 'include' property and not the 'files' property. Glob patterns require TypeScript version 2.0 or later.
 * 指定要排除在编译之外的文件列表。“exclude”属性只影响通过“include”属性包含的文件，
 * 而不影响“files”属性。Glob模式需要TypeScript 2.0或更高版本。
 * 个人理解：exclude即排除，但是排除的是include里面的文件。
 */
