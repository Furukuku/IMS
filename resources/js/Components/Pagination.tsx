import { Link as PaginationLink } from "@/types";
import { Link } from "@inertiajs/react";


const Pagination = ({ 
  links, 
  currentPage,
  lastPage,
  total,
  from,
  to,
  firstPageUrl,
  lastPageUrl
}: { 
  links: PaginationLink[];
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  firstPageUrl: string;
  lastPageUrl: string;
}) => {
  if (firstPageUrl == lastPageUrl) return null;

  links[0].label = '&laquo;';
  links[links.length - 1].label = '&raquo;';

  return (
    <nav className="flex justify-center lg:justify-end my-3">
      <div className="divide-y-8 divide-white">
        <ul className="flex justify-center items-center text-sm rounded divide-x-2 border">
          {links.length <= 6 ? (
            <>
              {links.map((link, index) => (
                <li key={link.label}>
                  {link.url && !link.active ? (
                    <Link
                      preserveScroll
                      href={link.url}
                      as="button"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                      className={`py-1.5 ${link.active && 'bg-zinc-950 text-white'} ${index === 0 || index === links.length - 1 ? 'px-3' : 'w-8'}`}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: link.label }}
                      className={`py-1.5 text-center ${link.active && 'bg-zinc-950 text-white'} ${index === 0 || index === links.length - 1 ? 'px-3' : 'w-8'}`}
                    />
                  )}
                </li>
              ))}
            </>
          ): (
            <>
              {/* Always print previous button */}
              <li>
                {links[0].url && !links[0].active ? (
                  <Link
                    preserveScroll
                    href={links[0].url}
                    as="button"
                    dangerouslySetInnerHTML={{ __html: links[0].label }}
                    className="py-1.5 px-3"
                  />
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: links[0].label }}
                    className="py-1.5 px-3 text-center"
                  />
                )}
              </li>

              {/* Always print first page button */}
              <li>
                {links[1].url && !links[1].active ? (
                  <Link
                    preserveScroll
                    href={links[1].url}
                    as="button"
                    dangerouslySetInnerHTML={{ __html: links[1].label }}
                    className={`py-1.5 ${links[1].active && 'bg-zinc-950 text-white'} w-8`}
                  />
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: links[1].label }}
                    className={`py-1.5 text-center ${links[1].active && 'bg-zinc-950 text-white'} w-8`}
                  />
                )}
              </li>

              {/* Print "..." only if currentPage is > 3 */}
              {currentPage > 3 && <p className="py-1.5 w-8 text-center">...</p>}

              {/* special case where last page is selected */}
              {currentPage === lastPage && (
                <li>
                  {links[currentPage - 2].url && !links[currentPage - 2].active ? (
                    <Link
                      preserveScroll
                      href={links[currentPage - 2].url}
                      as="button"
                      dangerouslySetInnerHTML={{ __html: links[currentPage - 2].label }}
                      className={`py-1.5 ${links[currentPage - 2].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: links[currentPage - 2].label }}
                      className={`py-1.5 text-center ${links[currentPage - 2].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  )}
                </li>
              )}

              {/* Print previous number button if currentPage > 2 */}
              {currentPage > 2 && (
                <li>
                  {links[currentPage - 1].url && !links[currentPage - 1].active ? (
                    <Link
                      preserveScroll
                      href={links[currentPage - 1].url}
                      as="button"
                      dangerouslySetInnerHTML={{ __html: links[currentPage - 1].label }}
                      className={`py-1.5 ${links[currentPage - 1].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: links[currentPage - 1].label }}
                      className={`py-1.5 text-center ${links[currentPage - 1].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  )}
                </li>
              )}

              {/* Print current page number button as long as it not the first or last page */}
              {(currentPage !== 1 && currentPage !== lastPage) && (
                <li>
                  {links[currentPage].url && !links[currentPage].active ? (
                    <Link
                      preserveScroll
                      href={links[currentPage].url}
                      as="button"
                      dangerouslySetInnerHTML={{ __html: links[currentPage].label }}
                      className={`py-1.5 ${links[currentPage].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: links[currentPage].label }}
                      className={`py-1.5 text-center ${links[currentPage].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  )}
                </li>
              )}

              {/* print next number button if currentPage < lastPage - 1 */}
              {currentPage < lastPage - 1 && (
                <li>
                  {links[currentPage + 1].url && !links[currentPage + 1].active ? (
                    <Link
                      preserveScroll
                      href={links[currentPage + 1].url}
                      as="button"
                      dangerouslySetInnerHTML={{ __html: links[currentPage + 1].label }}
                      className={`py-1.5 ${links[currentPage + 1].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: links[currentPage + 1].label }}
                      className={`py-1.5 text-center ${links[currentPage + 1].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  )}
                </li>
              )}

              {/* special case where first page is selected */}
              {currentPage === 1 && (
                <li>
                  {links[currentPage + 2].url && !links[currentPage + 2].active ? (
                    <Link
                      preserveScroll
                      href={links[currentPage + 2].url}
                      as="button"
                      dangerouslySetInnerHTML={{ __html: links[currentPage + 2].label }}
                      className={`py-1.5 ${links[currentPage + 2].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{ __html: links[currentPage + 2].label }}
                      className={`py-1.5 text-center ${links[currentPage + 2].active && 'bg-zinc-950 text-white'} w-8`}
                    />
                  )}
                </li>
              )}

              {/* print "..." if currentPage is < lastPage -2 */}
              {currentPage < lastPage - 2 && <p className="py-1.5 w-8 text-center">...</p>}

              {/* Always print last page button if there is more than 1 page */}
              <li>
                {links[lastPage].url && !links[lastPage].active ? (
                  <Link
                    preserveScroll
                    href={links[lastPage].url}
                    as="button"
                    dangerouslySetInnerHTML={{ __html: links[lastPage].label }}
                    className={`py-1.5 ${links[lastPage].active && 'bg-zinc-950 text-white'} w-8`}
                  />
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: links[lastPage].label }}
                    className={`py-1.5 text-center ${links[lastPage].active && 'bg-zinc-950 text-white'} w-8`}
                  />
                )}
              </li>

              {/* Always print next button if there is more than 1 page */}
              <li>
                {links[links.length - 1].url && !links[links.length - 1].active ? (
                  <Link
                    preserveScroll
                    href={links[links.length - 1].url}
                    as="button"
                    dangerouslySetInnerHTML={{ __html: links[links.length - 1].label }}
                    className="py-1.5 px-3"
                  />
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: links[links.length - 1].label }}
                    className="py-1.5 px-3 text-center"
                  />
                )}
              </li>
            </>
          )}
        </ul>
        <p className="text-center text-xs">Showing {from} to {to} of {total} entries.</p>
      </div>
    </nav>
  );
};

export default Pagination;
